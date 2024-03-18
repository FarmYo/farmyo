import React from 'react'
// import { useNavigate } from "react-router-dom";
import '../../../css/mainpage.css'
import Logo from '../../../image/component/user/logo.png';

export default function Mainpage() {
//  const navigate = useNavigate()
  return(
  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 logo">
    <div className="mx-auto w-full max-w-sm mb-0">
      <img
        className="mx-auto h-auto w-auto"
        src={Logo}
        alt="FarmYo"
      />
    </div>
    <div className="mx-4">
      <input 
        type="text" 
        placeholder="농산물 검색"
        className="h-10 w-full rounded-md py-1 text-gray-900 focus:ring-lime-950 pl-2"
      />
    </div>
    <div className="flex mx-2 my-4">
      <button
//        onClick={() => {navigate("/signup/first")}}
        // 판매글 게시판으로 보내기
        className="buttonmain"
      >
        팔아Yo
      </button>
      <button
//        onClick={() => {navigate("/signup/first")}}
        // 구매글 게시판으로 보내기
        className="buttonmain"
      >
        살래Yo
      </button>
    </div>
  </div>
  )
}