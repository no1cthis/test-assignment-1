import React, { useEffect, useState } from 'react';
import { useDisplay, useIsLoading } from '../../hooks/useIsLoading';
import ServerService from '../../Service/ServerService';



import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input'
import Upload from '../UI/Upload/Upload'

import cl from './postPage.module.scss'
import successImg from '../../resources/img/success-image.png'

function PostsPage({setPosted, posted}) {
    const nameCheck = "^.{2,60}$"
    const emailCheck = '^(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$';
    const phoneCheck = "^[\+]{0,1}380([0-9]{9})$"

    const [errors, setErrors] = useState([])
    const [errorPost, setErrorPost] = useState('')
    const [postedMessage, setPostedMessage] = useState('')
    const [values, setValues] = useState({
        name:   '',
        email:  '',
        phone:  '',
    })

    const inputs =[
        {
            name:           'name',
            type:           'text',
            placeholder:    'Your name',
            errorText:      '2-60 character',
            required:       true,
            pattern:        nameCheck,
            patternJS:      /^.{2,60}$/,
        },
        {
            name:           'email',
            type:           'email',
            placeholder:    'Email',
            errorText:      "Not valid email. Check if it's correct",
            required:       true,
            pattern:        emailCheck,
            patternJS:      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
        },
        {
            name:           'phone',
            type:           'text',
            placeholder:    'Phone',
            helperText:     '+38 (XXX) XXX - XX - XX',
            errorText:      "Not correct number. Example: +38 (XXX) XXX - XX - XX",
            required:       true,
            pattern:        phoneCheck,
            patternJS:      /^[\+]{0,1}380([0-9]{9})$/,
        },
    ]
    
    
    const [postUser, isPostingLoading] = useIsLoading(async ()=>{
        ServerService.post(values)
        const response = await(ServerService.post(values))
        console.log(response)
        if(response.status < 300)
        {
            setPostedMessage('User has been registered')
            setErrorPost('')
            setPosted(true);
        }
        else{
            setErrorPost(`Error: ${response.status}`)
        }
    })

    function SignUp(){
        inputs.forEach(input =>{
            if(!input.patternJS.test(values[input.name]))
                return
        })
        if(!values.photo)
        {
            setErrors('photo')
            return;
        }
        postUser();
    }

    useEffect(()=>{
       if(!posted)
            return

        setTimeout(()=>{
            const scrollTo = document.querySelector('#get')
            scrollTo.scrollIntoView();
        }, 1000)
    },[posted])
    
    const handleUpload       = (file)   => values.photo = file

    
    const formElement = <form className={cl.form} onSubmit={SignUp}>
                            {inputs.map(input =>{
                           return( <div className={cl.input}>
                                        <Input 
                                        key                 = {input.name}
                                        values              = {values}
                                        setValues           = {setValues}
                                        {...input}
                                        />
                                    </div>  )   
                            })} 

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
                            style={{marginBottom: errorPost ? 'calc(100px - 26px)' : '100px'}}
                            >
                                {errorPost ? errorPost : null}
                            </div>
                        </form>

    return ( 
        <section className={cl.post} >
            <h2 className={cl.title} id='post'>{posted ? postedMessage : "Working with VALIDATION"}</h2>
            {
            posted    
                    ?   <img className={cl.success} src={successImg} alt='User registered image'/>
                    :   formElement
            
            }
        </section>
     );
}

export default PostsPage;