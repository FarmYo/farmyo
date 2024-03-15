import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import 'css/signup.css';

export default function SignUpSecond() {
  const navigate = useNavigate()
  useEffect(() => {
    const allInputs = document.querySelectorAll('input');
    const button = document.querySelector('.finishbutton');
  
    allInputs.forEach(input => {
      input.addEventListener('focus', () => {
        button.style.display = 'none';
      });
  
      input.addEventListener('blur', () => {
        button.style.display = 'block';
      });
    });
  }, []);
  return(
    <div>
    <div className="main mx-auto w-auto max-w-sm p-10">
      <label 
        htmlFor="nickname"
        className="block text-sm font-medium leading-6 text-gray-900 mt-2"
      >
        닉네임
      </label>

      <div>
        <input 
          id="nickname" 
          name="nickname" 
          type="text" 
          placeholder="닉네임"
          autoComplete="text"
          required
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
        />
      </div>
<div className="mt-10">
      <label 
        htmlFor="phonenumber"
        className="block text-sm font-medium leading-6 text-gray-900 mt-2"
      >
        연락처
      </label>

      <div>
        <input 
          id="phonenumber" 
          name="phonenumber" 
          type="tel" 
          placeholder="연락처"
          autoComplete="tel"
          required
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
        />
      </div>
      </div>

<div className="mt-10">
      <label 
        htmlFor="address"
        className="block text-sm font-medium leading-6 text-gray-900 mt-4"
      >
        주소
      </label>
      <div className="flex">
        <input 
          id="address" 
          name="address" 
          type="text"
          placeholder="주소"
          autoComplete="address"
          required
          className="block h-10 w-50% rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
        />
        <button className="checkbutton">주소검색</button>
        {/* 주소검색 API 연결 로직 필요 */}
      </div>
      
      <div>
        <input 
          id="detailaddress" 
          name="detailaddress" 
          type="text" 
          placeholder="상세주소"
          autoComplete="text"
          required
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3 mt-2"
        />
      </div>
      </div>

    </div>
    <div className="fixed-bottom">
      <button 
        className="finishbutton"
        onClick={() => {navigate("/signup/third")}}
      >
        추가정보입력(2/3)
      </button>
    </div>
    </div>
  )
}