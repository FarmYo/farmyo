import React from 'react'
import Logo from '../../../image/component/user/logo.png';

export default function Login() {
  return (
    // <div>
    //     <input type="text" placeholder="아이디" className="input input-bordered w-full max-w-xs" />
    //     <input type="text" placeholder="비밀번호" className="input input-bordered w-full max-w-xs" />
    // </div>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        className="mx-auto h-auto w-auto"
        src={Logo}
        alt="FarmYo"
      />
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST">
        <div>
          <label 
            htmlFor="id" className="block text-sm font-medium leading-6 text-gray-900"
          >
            아이디
          </label>
          <div className="mt-2">
            <input
              id="id"
              name="id"
              type="text"
              autoComplete="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6"
              placeholder="아이디"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label 
              htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900"
            >
              비밀번호
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6"
              placeholder="비밀번호"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-lime-900 hover:bg-lime-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-950"
          >
            로그인
          </button>
        </div>
      </form>

    </div>
  </div>
  )
}