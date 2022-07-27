import React, { useEffect, useRef, useState } from 'react';
import { useDisplay, useIsLoading } from '../../hooks/useIsLoading';
import { useSort } from '../../hooks/useSort';
import ServerService from '../../Service/ServerService';

import CardList from '../CardList/CardList';
import Button from '../UI/Button/Button';

import cl from './getPage.module.scss'


function GetPage({posted}) {
        
    const [users, setUsers] = useState([])
    let page = useRef(2)
    let totalPages = useRef(3)

    const [fetchingUsersInit, isUsersLoading, errorUsers] = useIsLoading(async (count=6)=>{
        const response = (await ServerService.getUsersByPage(1, count))
        setUsers(response.users)
        totalPages.current = response.total_pages;
    })

    const [fetchingNewUsers, isNewUsersLoading, errorNewUsers] = useIsLoading(async (count=6)=>{
        const response = await ServerService.getUsersByPage(page.current, count)
        totalPages.current = response.total_pages 
        if(page.current >= response.total_pages+1)
        return
        page.current = page.current + 1
        setUsers( [...users, ...response.users])
    })

    useEffect(()=>{
        if(posted == true)
        {
        fetchingUsersInit()
        }
    }, [posted])

    useEffect(() => {
        fetchingUsersInit();
    },[])


    const sortedUsers = useSort(users, 'registration_timestamp')

    const btn = page.current >= totalPages.current+1
    ? null
    : <div onClick={(fetchingNewUsers)} className={cl.button}><Button width={"120px"}>Show more</Button></div>

    const disableBtn = <div className={cl.button}><Button width={"120px"} disabled>Show more</Button></div>
  
    return ( 
        <section className={cl.get}>
            <h2 className={cl.title} id={'get'}>Working with GET request</h2>
            <div className={cl.list}>{useDisplay(<CardList items={sortedUsers}/>, isUsersLoading, errorUsers)}</div> 
            { useDisplay(btn, isNewUsersLoading, errorNewUsers, disableBtn)}
        </section>
     );
}

export default GetPage;