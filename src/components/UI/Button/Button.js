import React from 'react';

import cl from './button.module.scss'


function Button({children, disabled, width, anchor, type='button'}) {
    return ( 
        <a href={anchor ? anchor : null}>
        <input 
        tabIndex= {anchor ? "-1" : 0}
        type={type}  
        className={disabled ? cl.btn__disabled : cl.btn} 
        value={children} 
        style={{width: width ? width : null}}
        />
        </a>
     );
}

export default Button;