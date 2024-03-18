import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import '../../../../css/signup.css';

export default function SignUpFirst() {
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
        htmlFor="id"
        className="block text-sm font-medium leading-6 text-gray-900 mt-2"
      >
        아이디
      </label>

      <div>
        <input 
          id="id" 
          name="id" 
          type="text" 
          placeholder="아이디"
          autoComplete="text"
          required
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
        />
        <p className="warningmessage">중복된 아이디입니다.</p>
      </div>

<div className="mt-8">
      <label 
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900 mt-4"
      >
        이메일
      </label>
      <div className="flex">
        <input 
          id="email" 
          name="email" 
          type="email" 
          placeholder="이메일"
          autoComplete="text"
          required
          className="block h-10 w-50% rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
        />
        <button className="checkbutton">인증번호 발송</button>
        {/* 인증코드 발송 로직 필요 */}
      </div>
      
      <div className="flex">
        <input 
          id="authenticationCode" 
          name="authenticationCode" 
          type="text" 
          placeholder="인증번호"
          autoComplete="text"
          required
          className="block h-10 w-50% rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3 mt-2"
        />
        <button className="checkbutton">인증번호 확인</button>
      </div>
        <p className="warningmessage">잘못된 인증번호입니다.</p>
      </div>

      <div className="mt-8">
      <label 
        htmlFor="password"
        className="block text-sm font-medium leading-6 text-gray-900 mt-2"
      >
        비밀번호
      </label>

        <input 
          id="password" 
          name="password" 
          type="password" 
          placeholder="비밀번호"
          autoComplete="password"
          required
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
        />
        <input 
          id="passwordcheck" 
          name="passwordcheck" 
          type="password" 
          placeholder="비밀번호 확인"
          autoComplete="password"
          required
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3 mt-2"
        />
        <p className="warningmessage">두 비밀번호가 일치하지 않습니다.</p>
      </div>

    </div>
    <div className="fixed-bottom">
      <button 
        className="finishbutton"
        onClick={() => {navigate("/signup/second")}}
      >
        추가정보입력(1/3)
      </button>
    </div>
    </div>
  )
}