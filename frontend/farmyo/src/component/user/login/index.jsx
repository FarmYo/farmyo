import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import api from "../../../api/api"
import Swal from 'sweetalert2';
import Logo from '../../../image/component/user/logo.png';
import '../../../css/signup.css';

export default function LoginInput() {
  const navigate = useNavigate()

  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const goLogin = () => {
    if (id === "" || password === "") {
      if (id === "") {
        console.log('아이디가 비었다')
      } else {
        console.log('비밀번호가 비었다')
      }
    } else {
    api.post('users/login', {
        loginId:id, password
      }
    )
    .then((res) => {
      console.log('로그인 완료')
      const accessToken = res.headers.access
      localStorage.setItem("access", accessToken)
      navigate("/", { replace : true })
    })
    .catch((err) => {
      console.log('로그인 실패', err)
      setId("")
      setPassword("")
      if (err.response.data.dataHeader?.resultCode === "U-000") {
        Swal.fire({
          title: '탈퇴한 회원입니다.',
          confirmButtonColor: '#1B5E20',
        });
      } else {
        Swal.fire({
          title: '아이디·비밀번호를<br>확인해주세요',
          confirmButtonColor: '#1B5E20',
        });
    }
  })
  }}


  useEffect(()=>{

  },[])

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
        <div>
          <div className="mt-2">
            <input
              value={id}
              onChange={(event) => {setId(event.target.value)}}
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
          <div className="mt-2">
            <input
              value={password}
              onChange={(event) => {setPassword(event.target.value)}}
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
            onClick={() => goLogin()}
            className="flex w-full justify-center rounded-md px-3 py-2 mt-5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-950 h-10"
            style={{backgroundColor:'#1B5E20'}}
          >
            로그인
          </button>
          <div className="ml-14 my-4">
            <Link to="/password" className="mr-3">비밀번호 찾기</Link> | <Link to="/signup" className="m-3">회원가입</Link>
          </div>
        </div>
    </div>
  </div>
  )
}