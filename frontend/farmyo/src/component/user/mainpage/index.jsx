import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../../../css/mainpage.css'
import Logo from '../../../image/component/user/logo.png';

export default function Mainpage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const moveBoard = ((event) => {
    event.preventDefault();
    navigate('/test', { state: { value:"농산물", search } });
  })

  return(
  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 logo space-y-10">
    <div className="mx-auto w-full max-w-sm mb-0">
      <img
        className="mx-auto h-auto w-auto"
        src={Logo}
        alt="FarmYo"
      />
    </div>
    <form onSubmit={moveBoard} className="mx-4">
      <input 
        value={search}
        onChange={(event) => {
          setSearch(event.target.value)
        }}
        type="text" 
        placeholder="농산물 검색"
        className="h-10 w-full rounded-md py-1 text-gray-900 focus:ring-lime-950 pl-2"
      />
    </form>
    <div className="flex my-4 w-full">
      <button
//        onClick={() => {navigate("/signup/first")}}
        onClick={() => {
        navigate("/board",{state:{selected:0}}
        )}}
        className="buttonmain"
      >
        팔아Yo
      </button>
      <button
        onClick={() => navigate("/board",{state:{selected:1}})}
        // 구매글 게시판으로 보내기
        className="buttonmain"
      >
        살래Yo
      </button>
    </div>
  </div>
  )
}