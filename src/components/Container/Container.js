import React from 'react';

import cl from './container.module.scss'

function Container({children}) {
    return ( 
        <div className={cl.container}>
            {children}
        </div>
     );
}

export default Container;