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
                <h3 className={cl.descriprion}>This my Test assignment for one company. I won't tell for which one :p  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt quos ut blanditiis, harum aut sapiente necessitatibus possimus fuga debitis nisi consequuntur perferendis voluptatem iste aperiam obcaecati minus nostrum impedit illum illo.</h3>
            </div>
            <div className={cl.button}><Button anchor='#post'>Sign up</Button></div>
        </Container>
    </section>
     );
}

export default WelcomePage;