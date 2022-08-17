import React, { useState } from 'react';

import Container from "../Container/Container";
import Header from '../Header/Header'
import GetPage from '../GetPage/GetPage';
import WelcomePage from '../WelcomePage/WelcomePage';
import PostsPage from '../PostPage/PostPage';

import './App.scss'



function TestCompany1() {
const [posted, setPosted] = useState(false)

  const isPosted = (bool) =>{
    setPosted(bool)
  }

  return (
    <>
    <Header/>
    <WelcomePage/>
    <Container>
      
      <GetPage    posted = {posted}/>
      <PostsPage  posted = {posted} setPosted = {isPosted}/>
    </Container>
    </>
  );
}

export default TestCompany1;
