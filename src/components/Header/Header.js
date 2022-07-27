import React from 'react';

import Container from '../Container/Container';
import Button from '../UI/Button/Button'

import logo from '../../resources/img/Logo.svg'
import cl from './header.module.scss'


function Header() {
    return ( 
        <section className={cl.header}>
            <Container>
                <div className={cl.header__wrapper}>
                    <a className={cl.logo} href="#!">
                        <img src={logo} alt="Logo" />
                    </a>

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