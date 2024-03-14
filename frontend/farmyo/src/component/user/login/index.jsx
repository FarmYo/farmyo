import React from 'react'
import { useNavigate, Link } from "react-router-dom";
import Logo from '../../../image/component/user/logo.png';
import 'css/login.css';

export default function LoginInput() {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 main">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-0">
      <img
        className="mx-auto h-auto w-auto"
        src={Logo}
        alt="FarmYo"
      />
    </div>

    <div className="mt-0 sm:mx-auto sm:w-full sm:max-w-sm">
      {/* <form className="space-y-6" action="#" method="POST"> */}
        <div>
          {/* <label 
            htmlFor="id" className="block text-sm font-medium leading-6 text-gray-900"
          >
            아이디
          </label> */}
          <div className="mt-2">
            <input
              id="id"
              name="id"
              type="text"
              autoComplete="text"
              required
              className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
              placeholder="아이디"
            />
          </div>
        </div>

        <div>
          {/* <div className="flex items-center justify-between mt-2">
            <label 
              htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900"
            >
              비밀번호
            </label>
          </div> */}
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
              placeholder="비밀번호"
            />
          </div>
        </div>

        <div>
          <button
            onClick={() => {navigate("/")}}
            className="flex w-full justify-center rounded-md px-3 py-2 mt-5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-950 h-10"
            style={{backgroundColor:'#1B5E20'}}
          >
            로그인
          </button>
          <div className="ml-14 my-4">
            <Link to="/password" className="mr-3">비밀번호 찾기</Link> | <Link to="/signup" className="m-3">회원가입</Link>
          </div>
        </div>
      {/* </form> */}

    </div>
  </div>
  )
}