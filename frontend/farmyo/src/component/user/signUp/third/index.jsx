import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import '../../../../css/signup.css';

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
    <div className="main2 mx-auto w-auto max-w-sm p-10">
      <label 
        htmlFor="account"
        className="block text-sm font-medium leading-6 text-gray-900 mt-2"
      >
        계좌
      </label>

      <div>
        <input 
          id="account" 
          name="account" 
          type="text" 
          placeholder="예금주"
          autoComplete="text"
          required
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
        />
      </div>
      <div>
        <input 
          id="accountnumber" 
          name="accountnumber" 
          type="text" 
          placeholder="계좌번호"
          autoComplete="text"
          required
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3 mt-4"
        />
      </div>
      <div>
        <input 
          id="bank" 
          name="bank" 
          type="text" 
          placeholder="은행명"
          autoComplete="text"
          required
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3 mt-4"
        />
      </div>

    </div>
    <div className="fixed-bottom">
      <button 
        className="finishbutton"
        // onClick={() => {navigate("/login")}} // 구매자용
        onClick={() => {navigate("/signup/business")}} // 사업자등록(판매자용)
      >
        회원 가입 완료(3/3)
      </button>
    </div>
    </div>
  )
}