import React from 'react'
import { useNavigate } from "react-router-dom";
import 'css/signup.css';

export default function SignUp() {
  const navigate = useNavigate()
  return(
    <div>
      회원가입 선택
      <div className="flex">
      <button
            onClick={() => {navigate("/signup/first")}}
            className="buttonmain"
          >
            판매자
      </button>
      <button
            onClick={() => {navigate("/signup/first")}}
            className="buttonmain flex w-full justify-center rounded-md px-3 py-2 mt-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-950 h-10"
          >
            구매자
          </button>
      </div>
    </div>
  )
}