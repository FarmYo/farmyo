import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Router from './router'
import BottomBar from './component/common/bottombar'
// import { useHistory } from 'react-router-dom'

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
    '/mypage/:myfarmId/detail',
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

  const isDefinedRoute = definedRoutes.some(route => new RegExp(`^${route}$`).test(location.pathname));

  // 현재 경로가 숨겨야 하는 경로 중 하나와 일치하는지 확인
  const isHidePatternMatch = hidePatterns.some(pattern => pattern.test(location.pathname));

  // 정의된 경로 중 하나도 아니거나 숨겨야 하는 경로 중 하나와 일치하면 true 반환
  return !isDefinedRoute || isHidePatternMatch;

  };

  return (
    <div >
        <Router />
        {!shouldHideBottomBar() && <BottomBar className="bottomBar" />}
    </div>
  );
}

export default App;
