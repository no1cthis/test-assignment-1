import React, { useState } from 'react';

import cl from './input.module.scss'

function Input({placeholder, helperText, errorText, error, value, handleChange, id, pattern}) {
    const [dirty, setDirty] = useState(false);

    let helperTextElement = helperText 
    ? (<div className={cl['input__helper-text']}>{helperText}</div>)
    : null

    if(error && errorText)
        helperTextElement = (<div className={`${cl['input__helper-text']} ${cl.error}`}>
                                {error && dirty && !pattern.test(value) ? errorText : helperText}
                            </div>) 
    


    return ( 
        <div className={cl.wrapper}>
            <input 
            type="text" 
            className={cl.input}  
            placeholder={placeholder} 
            style={{borderColor: error ? "#CB3D40" : null}}
            value={value}
            id={id}
            onChange={handleChange}
            onBlur={()=>setDirty(true)}
            />
            <div className={`${cl.input__filled} ${error ? cl.error : null}`} style={{opacity: value ? 1 : 0}}>{placeholder}</div>
            {helperTextElement}
        </div>
        
     );
}


export default Input;