import React from 'react'
// import { useNavigate } from "react-router-dom";
import 'css/signup.css';

export default function SignUpFirst() {
  // const navigate = useNavigate()
  return(
    <div className="mt-10 mx-auto w-auto max-w-sm p-10">
      회원가입 첫번째 페이지
      <label 
        htmlFor="id"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        아이디
      </label>

      <div className="mt-2">
        <input 
          id="id" 
          name="id" 
          type="text" 
          placeholder="아이디"
          autoComplete="text"
          required
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
        />
      </div>

    </div>
  )
}