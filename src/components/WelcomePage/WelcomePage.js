import React from 'react';
import Container from '../Container/Container';
import Button from '../UI/Button/Button';

import cl from './welcomePage.module.scss'

function WelcomePage() {
    return ( 
    <section className={cl.welcomePage}>
        <Container>
            <div className={cl.text}>
                <h1 className={cl.title}>Test assignment for front-end developer</h1>
                <h3 className={cl.descriprion}>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</h3>
            </div>
            <div className={cl.button}><Button anchor='#post'>Sign up</Button></div>
        </Container>
    </section>
     );
}

export default WelcomePage;