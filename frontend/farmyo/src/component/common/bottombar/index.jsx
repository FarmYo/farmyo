import React, { useState, useEffect } from 'react';
import { Link,useLocation } from "react-router-dom";
import Home from '../../../image/component/home.png';
import Trade from '../../../image/component/trade.png';
import Board from '../../../image/component/board.png';
import Chat from '../../../image/component/chat.png';
import Mypage from '../../../image/component/mypage.png';
import HomeClick from '../../../image/component/homeclick.png';
import TradeClick from '../../../image/component/tradeclick.png';
import BoardClick from '../../../image/component/boardclick.png';
import ChatClick from '../../../image/component/chatclick.png';
import MypageClick from '../../../image/component/mypageclick.png';
import '../../../css/bottombar.css';
import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';
import "../../../css/bottombar.css"

export default function BottomBar() {
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState('');
  // const im = jwtDecode(localStorage.getItem('access')).userJob
  const im = localStorage.getItem('access') ? jwtDecode(localStorage.getItem('access')).userJob : null;
 


  useEffect(() => {
    // 현재 경로를 기반으로 currentPage 상태를 업데이트
    const path = location.pathname.split('/')[1];
    setCurrentPage(path);
  }, [location]);


  const menuItems = [
    { key: 'home', to: '/', text: '홈', image: currentPage === '' ? HomeClick : Home },
    { key: 'trade', to: '/trade', text: '거래', image: currentPage.startsWith('trade') ? TradeClick : Trade },
    { key: 'board', to: '/board', text: '팜&삼', image: currentPage.startsWith('board') ? BoardClick : Board },
    { key: 'chat', to: '/chat', text: '채팅', image: currentPage.startsWith('chat') ? ChatClick : Chat },
    { key: 'mypage', to: `/mypage/${im === 0 ? "seller" : "buyer"}`, text: '프로필', image: currentPage.startsWith('mypage') ? MypageClick : Mypage },
  ];


  
  return (
    <div>
      <nav className=" fixed bottom-0 bg-white border-t-2 border-gray-300 w-full ">
        <div className='p-3'>
          <div className="flex justify-between">
            {menuItems.map(({ key, to, text, image }) => (
              <div key={key} className='flex flex-col items-center justify-center'>
                <Link to={to}>
                  <img src={image} className="size" alt="" />
                  <p className='text-sm text-center font-bold mt-2'>{text}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}