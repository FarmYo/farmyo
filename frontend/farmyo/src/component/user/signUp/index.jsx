import React from 'react'
// import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import '../../../css/signup.css';
import Logo from '../../../image/component/user/logo.png';

export default function SignUp() {
  const navigate = useNavigate()
  // const [selected,setSelected] = useState(null)
  // useEffect(()=>{
  //   setSelected(0);
  // },[])
  // const handleClick = (index) => {
  //   setSelected(index)
  // }
  return(
  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 logo">
    <div className="mx-auto w-full max-w-sm mb-0">
      <img
        className="mx-auto h-auto w-auto"
        src={Logo}
        alt="FarmYo"
      />
    </div>
    <div className="flex mx-2 my-4">
      <button
        onClick={() => {navigate("/signup/first")}}
        // 여기에 판매자인지 구매자인지 구분해서 넘겨보내기
        className="buttonmain"
      >
        판매자
      </button>
      <button
        onClick={() => {navigate("/signup/first")}}
        className="buttonmain"
      >
        구매자
      </button>
    </div>
  </div>
  )
}