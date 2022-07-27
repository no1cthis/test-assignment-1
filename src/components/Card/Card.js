import React, { useState } from 'react';
import {useClipboard} from 'use-clipboard-copy'


import Photo from '../UI/Photo/Photo';
import image from '../../resources/img/photo-cover.jpg'
import cl from './card.module.scss'

function Card({photo=image, name='no name', position = 'no position', email = 'no email', phone = 'no phone'}) {

    const clipboard = useClipboard()

    const [tip, setTip] = useState(null)
    const [isCopied, setIsCopied] = useState(null)

    function isEllipsisActive(e, info) {
        if(e.target.scrollWidth > parseInt(window.getComputedStyle(e.target).width))
        {
            setTip(generateTip(info, e.clientX, e.clientY+window.scrollY+20))
        }  
   }

   function Copy(string, e){
    clipboard.copy(string);
    setIsCopied(generateTip('Copied',e.clientX, e.clientY+window.scrollY-40))
    setTimeout(()=>{
        setIsCopied(null)
    }, 400)
    
   }

    return ( 
        <>
    <div key={email} className={cl.card}>  
        <div className={cl.container}>
             <div className={cl.photo}>
                <Photo img={photo}/>
             </div>
             <div className={cl.details}>
                <div className={cl.text} onMouseMove={e => isEllipsisActive(e, name)} onMouseLeave={() => setTip(null)} onClick = {(e) => Copy(name, e)}>{name}</div>
                <div className={cl.text} onMouseMove={e => isEllipsisActive(e, position)} onMouseLeave={() => setTip(null)} onClick = {(e) => Copy(position, e)}>{position}</div>
                <div className={cl.text} onMouseMove={e => isEllipsisActive(e, email)} onMouseLeave={() => setTip(null)} onClick = {(e) => Copy(email, e)}>{email}</div>
                <div className={cl.text} onMouseMove={e => isEllipsisActive(e, phone)} onMouseLeave={() => setTip(null)} onClick = {(e) => Copy(phone, e)}>{phone}</div>
             </div>
        </div>
    </div>
      {tip}
      {isCopied}
    </>
     );
}

const generateTip = (info, mouseX, mouseY) => {
 return (<div className={cl.tip} style={{left: mouseX, top:mouseY}}>{info}</div>)
}

export default Card;