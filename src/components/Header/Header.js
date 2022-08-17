import React from 'react';

import Container from '../Container/Container';
import Button from '../UI/Button/Button'

import cl from './header.module.scss'


function Header() {
    return ( 
        <section className={cl.header}>
            <Container>
                <div className={cl.header__wrapper}>
                    <div className={cl.logo}>
                    </div>

                    <ul className={cl.buttons}>
                        <li className={cl.button}><Button  anchor='#get'>Users</Button></li>
                        <li className={cl.button}><Button  anchor='#post'>Sign up</Button></li>
                    </ul>
                </div>
            </Container>
        </section>
        
     );
}

export default Header;