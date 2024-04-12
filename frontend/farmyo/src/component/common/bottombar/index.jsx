import React, { useState, useEffect } from 'react';
import { Link,useLocation } from "react-router-dom";
import Home from '../../../image/bottombar/home.png';
import Trade from '../../../image/bottombar/trade.png';
import Board from '../../../image/bottombar/board.png';
import Chat from '../../../image/bottombar/chat.png';
import Mypage from '../../../image/bottombar/mypage.png';
import HomeClick from '../../../image/bottombar/homeclick.png';
import TradeClick from '../../../image/bottombar/tradeclick.png';
import BoardClick from '../../../image/bottombar/boardclick.png';
import ChatClick from '../../../image/bottombar/chatclick.png';
import MypageClick from '../../../image/bottombar/mypageclick.png';
import '../../../css/bottombar.css';
import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';
import "../../../css/bottombar.css"

export default function BottomBar() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('');
  const im = localStorage.getItem('access') ? jwtDecode(localStorage.getItem('access')).userJob : null;

  // 현재 경로가 /mypage/seller/:id 형태인지 확인
  const isSpecialBoardPath = location.pathname.startsWith('/mypage/seller/') && location.pathname.split('/').length === 4;

  useEffect(() => {
    // 현재 경로를 기반으로 currentPage 상태를 업데이트
    const path = location.pathname.split('/')[1];
    setCurrentPage(path);
  }, [location]);

  const menuItems = [
    { key: 'home', to: '/', text: '홈', image: currentPage === '' ? HomeClick : Home },
    { key: 'trade', to: '/trade', text: '거래', image: currentPage.startsWith('trade') ? TradeClick : Trade },
    // "팜&삼" 위치의 아이콘 설정
    { key: 'board', to: '/board', text: '팜&삼', image: isSpecialBoardPath ? BoardClick : (currentPage.startsWith('board') ? BoardClick : Board) },
    { key: 'chat', to: '/chat', text: '채팅', image: currentPage.startsWith('chat') ? ChatClick : Chat },
    // "프로필" 위치의 아이콘 설정: isSpecialBoardPath가 true일 때는 Mypage를 사용
    { key: 'mypage', to: `/mypage/${im === 0 ? "seller" : "buyer"}`, text: '프로필', image: currentPage.startsWith('mypage') && !isSpecialBoardPath ? MypageClick : Mypage },
  ];

  return (
    <div>
      <nav className="fixed bottom-0 bg-white border-t-2 border-gray-300 w-full">
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
