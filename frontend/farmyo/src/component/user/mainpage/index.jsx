import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../../../css/mainpage.css'
import HighLogo from '../../../image/component/user/highlogo.png';

export default function Mainpage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const moveBoard = ((event) => {
    event.preventDefault();
    navigate('/board', { state: { value:"농산물", search } });
  })

  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const isAnyHovered = isHovered1 || isHovered2;

  return(
  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 logo space-y-10">
    <div className="mx-auto w-full max-w-sm mb-0">
      <img
        className="mx-auto h-auto w-auto"
        src={HighLogo}
        alt="FarmYo"
        style={{ width:180 }}
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
        className="h-12 w-full rounded-md py-1 text-gray-900 pl-2"
        style={{ backgroundColor: '#E8F5E9',border : '3px solid #A5D6A7',}}
      />
    </form>
    <div className="flex my-4 w-full">
      <button
        onClick={() => {
        navigate("/board",{state:{selected:0}}
        )}}
        className="buttonmain"
        style={{border : '3px solid #A5D6A7',
        color: isAnyHovered ? '#FFFFFF' : 'black', 
        backgroundColor: isHovered1 ? '#81C784' : 'transparent'}}
        onMouseEnter={() => setIsHovered1(true)}
        onMouseLeave={() => setIsHovered1(false)}
      >
        <h1 className='text-xl'>팔아Yo</h1>
      </button>
      <button
        onClick={() => navigate("/board",{state:{selected:1}})}
        // 구매글 게시판으로 보내기
        className="buttonmain"
        style={{border : '3px solid #A5D6A7',
        color: isAnyHovered ? '#FFFFFF' : 'black',
        backgroundColor: isHovered2 ? '#81C784' : 'transparent' }}
        onMouseEnter={() => setIsHovered2(true)}
        onMouseLeave={() => setIsHovered2(false)}
      >
        <h1 className='text-xl'>살래Yo</h1>
      </button>
    </div>
  </div>
  )
}