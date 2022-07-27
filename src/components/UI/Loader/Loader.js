import React from 'react';

import cl from './loader.module.scss'
import loader from '../../../resources/img/Preloader.svg'

function Loader() {
    return ( 
        <div className={cl.loader}>
            <img src={loader} alt="Loader" />
        </div>
     );
}

export default Loader;