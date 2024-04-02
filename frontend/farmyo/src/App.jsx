import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Router from './router'
import BottomBar from './component/common/bottombar'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"
import "./css/bottombar.css"

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('access')) {
      navigate('/login')
    }}, [])
  
    
  const shouldHideBottomBar = () => {
    // 숨겨야 하는 경로를 정규 표현식
    const hidePatterns = [/^\/mypage\/edit$/,
    /^\/chat\/\d+$/,
    /^\/signup\/first$/, 
    /^\/signup\/second$/, 
    /^\/signup\/third$/, 
    /^\/signup\/business$/, 
    /^\/signup$/,
    /^\/login$/,
    /^\/stanby$/,
    /^\/password$/,
    /^\/trade\/.+$/,
    /^\/stanby\/.*/,
    /^\/mypage\/myfarm\/\d+$/,
  ];

  const definedRoutes = [
    '/',
    '/login',
    '/password',
    '/signup',
    '/signup/first',
    '/signup/second',
    '/signup/third',
    '/signup/business',
    '/trade',
    '/trade/seller/:tradeId',
    '/trade/buyer/:tradeId',
    '/mypage/seller',
    '/mypage/buyer',
    '/mypage/seller/:id',
    '/mypage/myfarm/:farmId',
    '/board',
    '/board/sell/:boardId/detail',
    '/board/buy/:boardId/detail',
    '/mypage/edit',
    '/chat',
    '/chat/:chatId',
    '/stanby',
    '/stanby/crop',
    '/stanby/trade',
    '/trade/redirect'
  ];
  if (location.pathname === '/trade') {
    return false;
  }

    // 정의된 경로를 확인할 때 사용할 정규 표현식으로 변환하는 함수
  const convertPathToRegex = (path) => {
    // ':parameter' 스타일의 경로 파라미터를 정규 표현식으로 변환
    const regexPath = path.replace(/:[^\s/]+/g, '([^\\s/]+)');
    return new RegExp(`^${regexPath}$`);
  };

  const isDefinedRoute = definedRoutes.some(route => convertPathToRegex(route).test(location.pathname));


  

  // 현재 경로가 숨겨야 하는 경로 중 하나와 일치하는지 확인
  const isHidePatternMatch = hidePatterns.some(pattern => pattern.test(location.pathname));

  // 정의된 경로 중 하나도 아니거나 숨겨야 하는 경로 중 하나와 일치하면 true 반환
  return !isDefinedRoute || isHidePatternMatch;

  };

  return (
    <div className='appContent'>
        <Router />
        {!shouldHideBottomBar() && <BottomBar/>}
    </div>
  );
}

export default App;
