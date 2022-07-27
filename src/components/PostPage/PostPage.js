import React, { useEffect, useState } from 'react';
import { useDisplay, useIsLoading } from '../../hooks/useIsLoading';
import {useFormik} from 'formik'
import ServerService from '../../Service/ServerService';



import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input'
import RadioButtons from '../UI/RadioButtons/RadioButtons';
import Upload from '../UI/Upload/Upload'

import cl from './postPage.module.scss'
import successImg from '../../resources/img/success-image.png'

function PostsPage({setPosted, posted}) {
    const nameCheck = /^.{2,60}$/
    const emailCheck = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    const phoneCheck = /^[\+]{0,1}380([0-9]{9})$/

    const [positions, setPositions] = useState([])
    const [errors, setErrors] = useState(['error'])
    const [postedMessage, setPostedMessage] = useState('')
    
    
    const [postUser, isPostingLoading] = useIsLoading(async ()=>{
        const response = await(ServerService.post(values))
        if(response.success)
            setPosted(response.success);
        setPostedMessage( response.message)
    })

    const {handleSubmit, handleChange, values} = useFormik({
        initialValues:{
            name:           '',
            email:          '',
            phone:          '',
            position_id:    '',
            photo:          '',
            id:             '',
        },
        onSubmit: (values) =>{
            new Promise((resolve) => {
                let info = Object.entries(values)
                info = info.filter(item => item[1] == '' && item[0] != 'id').map(item => item[0])
                if(!emailCheck.test(values.email) && values.email != '')
                    info = [...info, 'email']
                if(!phoneCheck.test(values.phone) && values.phone != '')
                    info = [...info, 'phone']
                if(!nameCheck.test(values.name) && values.name != '')
                    info = [...info, 'name']
                 setErrors(info)
                 resolve(info)
            })
            .then(info =>{
                if(info.length == 0){
                    values.id = new Date().getTime()
                    postUser()
                }
            })
            

            
        }
    })

    useEffect(()=>{
       if(!posted)
            return

        setTimeout(()=>{
            const scrollTo = document.querySelector('#get')
            scrollTo.scrollIntoView();
        }, 1000)
    },[posted])
    
    const handleRadioButtons = (e)      => values.position_id = e.target.value
    const handleUpload       = (file)   => values.photo = file
    

    const [fetchingPositions, isPositionLoading, errorPosition] = useIsLoading(async ()=>{
        const response = (await ServerService.getPostitons())
        setPositions(response)
    })

    useEffect(() =>{
        fetchingPositions();
    }, [])

    const isErrorPosting = () =>{
        return !(posted || postedMessage == 'Working with POST request')
    }
    
    const radioButtons = <div className={cl.radio__buttons}><RadioButtons handleChange={handleRadioButtons} items = {positions}/></div>

    const formElement = <form className={cl.form} onSubmit={handleSubmit}>
                            <div className={cl.input}>
                                        <Input 
                                        handleChange={handleChange} 
                                        value = {values.name} 
                                        id='name'  
                                        placeholder="Your name" 
                                        errorText= {errors.includes('name') ? 'Should be 2-60 characters' : null}
                                        error = {errors.includes('name') ? true : false}
                                        pattern = {nameCheck}
                                        />
                            </div>
                            <div className={cl.input}>
                                        <Input 
                                        handleChange={handleChange} 
                                        value = {values.email} 
                                        id='email' 
                                        placeholder="Email"
                                        error = {errors.includes('email') ? true : false}
                                        errorText= {errors.includes('email') ? 'Not valid Email' : null}
                                        pattern = {emailCheck}
                                        />
                            </div>
                            <div className={cl.input}>
                                        <Input 
                                        handleChange={handleChange} 
                                        value = {values.phone} 
                                        id='phone' 
                                        placeholder="Phone" 
                                        errorText= {errors.includes('phone') ? 'Not valid number' : null}
                                        helperText='+38 (XXX) XXX - XX - XX'
                                        error = {errors.includes('phone') ? true : false}
                                        pattern = {phoneCheck}
                                        />
                            </div>

                            <div 
                            className={cl.radio__title} 
                            style={{color: errors.includes('position_id') ? "#CB3D40" : null}}
                            >
                                Select your position
                            </div>

                            {useDisplay(radioButtons, isPositionLoading, errorPosition)}

                            <div className={cl.upload}>
                                    <Upload 
                                    handleUpload={handleUpload} 
                                    error = {errors.includes('photo') ? true : false}
                                    />
                            </div>

                            <div className={cl.button}>
                                {useDisplay(<Button type='submit'>Sign up</Button>, isPostingLoading)}
                            </div>

                            <div 
                            className={cl['error-message']} 
                            style={{marginBottom: isErrorPosting() ? 'calc(100px - 26px)' : '100px'}}
                            >
                                {isErrorPosting() ? postedMessage : null}
                            </div>
                        </form>

    return ( 
        <section className={cl.post} id='post'>
            <h2 className={cl.title}>{posted ? postedMessage : "Working with POST request"}</h2>
            {
            posted    
                    ?   <img className={cl.success} src={successImg} alt='User registered image'/>
                    :   formElement
            
            }
        </section>
     );
}

export default PostsPage;