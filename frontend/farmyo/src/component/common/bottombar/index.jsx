import React, { useState } from 'react';
import { Link } from "react-router-dom";
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

export default function BottomBar() {
  const [home, setHome] = useState({ image: Home, clicked: false });
  const [trade, setTrade] = useState({ image: Trade, clicked: false });
  const [board, setBoard] = useState({ image: Board, clicked: false });
  const [chat, setChat] = useState({ image: Chat, clicked: false });
  const [mypage, setMypage] = useState({ image: Mypage, clicked: false });

  const handleImageClick = (setState, state) => {
    setState({ ...state, clicked: true });
    // 나머지 이미지들의 clicked 상태를 false로 설정
    const otherStates = [setHome, setTrade, setBoard, setChat, setMypage].filter(setStateFunc => setStateFunc !== setState);
    otherStates.forEach(setStateFunc => setStateFunc(prevState => ({ ...prevState, clicked: false })));
  };

  return (
    <div>
      <nav className="bg-white border-t-2 border-gray-300 fixed bottom-0 w-full h-28">
        <div className='p-3'>
          <div className="flex justify-between">
            <div className='flex flex-col items-center justify-center'
            onClick={() => handleImageClick(setHome, home)}>
              <Link to="/">
                <img src={home.clicked ? HomeClick : home.image} className="size" alt="" />
                <p className='text-sm text-center font-bold mt-2'>홈</p>
              </Link>
            </div>
            <div 
              className='flex flex-col items-center justify-center' 
              onClick={() => handleImageClick(setTrade, trade)}
            >
              <Link to="/trade">
                <img src={trade.clicked ? TradeClick : trade.image} className="size" alt="" />
                <p className='text-sm text-center font-bold mt-2'>거래</p>
              </Link>
            </div>
            <div className='flex flex-col items-center justify-center' onClick={() => handleImageClick(setBoard, board)}>
              <img src={board.clicked ? BoardClick : board.image} className="size" alt="" />
              <p className='text-sm text-center font-bold mt-2'>팜&삼</p>
            </div>
            <div className='flex flex-col items-center justify-center' onClick={() => handleImageClick(setChat, chat)}>
              <img src={chat.clicked ? ChatClick : chat.image} className="size" alt="" />
              <p className='text-sm text-center font-bold mt-2'>채팅</p>
            </div>
            <div 
              className='flex flex-col items-center justify-center' 
              onClick={() => handleImageClick(setMypage, mypage)}
            >
              <Link to="/login">
                <img src={mypage.clicked ? MypageClick : mypage.image} className="size" alt="" />
                <p className='text-sm text-center font-bold mt-2'>마이</p>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
