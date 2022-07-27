import React from 'react';

import cl from './radioButtons.module.scss'

function RadioButtons({items, handleChange}) {
    const list = items.map(item => {
        return ( 
                <div className={cl.radio} key={item.id} >
                    <input  
                    className={cl.radio__button} 
                    type="radio" 
                    id={item.id} 
                    name="position" 
                    value={item.id} 
                    onChange = {(e) => handleChange(e)}
                    />
                    <label className={cl.radio__text} htmlFor={item.id}>{item.name}</label>
                </div>
        )
    })
    return ( 
    <div className={cl.radioButtons}>
        {[...list]}
    </div>
     );
}

export default RadioButtons;