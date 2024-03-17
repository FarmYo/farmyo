import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import '../../../css/signup.css';

export default function Business() {
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
    <div className="main2 mx-auto w-auto max-w-sm p-10">
      <label 
        htmlFor="businessnumber"
        className="block text-sm font-medium leading-6 text-gray-900 mt-2"
      >
        사업자등록
      </label>

      <div>
        <input 
          id="businessnumber" 
          name="businessnumber"
          type="text" 
          placeholder="사업자 등록번호"
          autoComplete="text"
          required
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
        />
      </div>
      <div>
        <input 
          id="businessname" 
          name="businessname" 
          type="text" 
          placeholder="대표자 성명"
          autoComplete="text"
          required
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3 mt-4"
        />
      </div>
      <label 
        htmlFor="businessopenday"
        className="block text-sm font-medium leading-6 text-gray-900 mt-2"
      >
        개업일자
      </label>
      <div>
        <input 
          id="businessopenday" 
          name="businessopenday" 
          type="date" 
          placeholder="개업일자"
          autoComplete="date"
          required
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3 mt-4"
        />
      </div>

    </div>
    <div className="fixed-bottom">
      <button 
        className="finishbutton"
        onClick={() => {navigate("/login")}} // 사업자등록확인 API 돌리기
      >
        사업자 인증
      </button>
    </div>
    </div>
  )
}