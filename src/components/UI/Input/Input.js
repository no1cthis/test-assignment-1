import React, { useEffect, useRef, useState } from 'react';

import cl from './input.module.scss'

function Input(props) {

    const {placeholder, helperText, errorText, values, name, setValues, ...inputProps} = props
    const [dirty, setDirty] = useState(false);

    const err = !props.patternJS.test(values[name]) && dirty

    let helperTextElement = err
    ?   (<div className={`${cl['input__helper-text']} ${cl.error}`}>{errorText}</div>)
    :   (<div className={cl['input__helper-text']}>{helperText}</div>)
    
    return ( 
        <div className={cl.wrapper}>
            <input 
            type="text" 
            className={cl.input}  
            placeholder={placeholder} 
            style={{borderColor: err ? "#CB3D40" : null}}
            value={values[name]}
            onChange={e => setValues({...values, [name]:e.target.value  })}
            onBlur={()=>setDirty(true)}
            {...inputProps}
            />
            <div className={`${cl.input__filled} ${err ? cl.error : null}`} style={{opacity: values[name] ? 1 : 0}}>{placeholder}</div>
            {helperTextElement}
        </div>
     );
}


export default Input;