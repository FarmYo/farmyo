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
  // let history = useHistory();
  
  // useEffect(() => {
  //   history.push('/login');
  // }, [history]);

  const shouldHideBottomBar = () => {
    // 숨겨야 하는 경로를 정규 표현식으로 정의합니다.
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
  ];

    // 현재 경로가 숨겨야 하는 경로 중 하나와 일치하는지 확인합니다.
    return hidePatterns.some(pattern => pattern.test(location.pathname));
  };

  return (
    <div >
        <Router />
        {!shouldHideBottomBar() && <BottomBar className="bottomBar" />}
    </div>
  );
}

export default App;
