import React from 'react'
import Logo from '../../../image/component/user/logo.png';

export default function CheckPassword() {
  // const navigate = useNavigate()
  return(
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 main">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-0">
        <img
          className="mx-auto h-auto w-auto"
          src={Logo}
          alt="FarmYo"
        />
      </div>

      <div className="mt-0 sm:mx-auto sm:w-full sm:max-w-sm">
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
        <div className="mt-4">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
            placeholder="이메일"
          />
        </div>


          <button
            // onClick={() => {}} 인증코드 발송 로직 짜기
            className="flex w-full justify-center rounded-md px-3 py-2 mt-4 mb-2 text-sm font-bold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-950 h-10"
            style={{backgroundColor:'#81C784'}}
            // 이메일 입력되면 버튼 활성화 되도록 처리
            // style={{backgroundColor:'#1B5E20'}}
          >
            인증코드 발송
          </button>
          <div className="mt-5">
          <input
            id="authenticationCode"
            name="authenticationCode"
            type="text"
            autoComplete="text"
            required
            className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
            placeholder="인증코드"
          />
        </div>

          <button
            // onClick={() => {navigate("/")}} 모달로 비밀번호 입력창 띄우기
            className="flex w-full justify-center rounded-md px-3 py-2 mt-4 text-sm font-bold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-950 h-10"
            style={{backgroundColor:'#1B5E20'}}
          >
            확인
          </button>
    </div>
  </div>
  )
}