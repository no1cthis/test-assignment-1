import React from 'react';

import cl from './photo.module.scss'

function Photo({img}) {
    return ( 
        <div className={cl.photo}>
            <img src={img} alt="" />
        </div>
     );
}

export default Photo;