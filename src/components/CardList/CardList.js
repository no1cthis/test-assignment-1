import React from 'react';

import Card from '../Card/Card';

import cl from './cardList.module.scss'

function CardList({items}) {
    const cardList = [...items].map(item => <Card key={item.id} {...item}/>)
    return ( 
        <div className={cl.cards__wrapper}>
               {[...cardList]}
        </div>
     );
}

export default CardList;