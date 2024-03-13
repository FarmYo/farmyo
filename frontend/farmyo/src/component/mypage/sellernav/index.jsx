import React, { useState,useEffect } from 'react'
import Me from '../../../image/component/me.png'
import Next from '../../../image/component/next.png'

export default function MypageNavbar() {
  const [selected,setSelected] = useState(null)

  useEffect(()=>{
    setSelected(0);
  },[])

  const handleClick = (index) => {
    setSelected(index)
  }

  return(
    <div>
      <div style={{height:50,backgroundColor:'#1B5E20'}}>
        <div className="p-2">
          <h1 className="text-xl font-bold" style={{color:"white"}}>마이페이지</h1>
        </div>
      </div>
      <div className='flex border-b-2 border-gray-300'style={{height:120}}>
        <div className='p-5 pt-7'>
          <img src={Me} alt="" />
        </div>
        <div className='p-7 pl-3'>
          <h1 className='font-bold'>오승현</h1>
          <h4 className='text-sm'>대구광역시 달서구 호산로 126</h4>
          <h4 className='text-sm'style={{color:'gray'}}>상태메시지 추가하기</h4>
        </div>
        <div className='flex justify-center items-center'>
          <img src={Next} alt="" style={{width:50,height:50}}/>
        </div>
      </div>
      <div className='flex justify-around p-3' style={{height:50}}>
        <h1 className='font-bold' style={{ color: selected === 0 ? 'black' : 'gray' }} onClick={()=>{handleClick(0)}}>마이팜</h1>
        <h1 className='font-bold' style={{ color: selected === 1 ? 'black' : 'gray' }} onClick={()=>{handleClick(1)}}>마이작물</h1>
        <h1 className='font-bold' style={{ color: selected === 2 ? 'black' : 'gray' }} onClick={()=>{handleClick(2)}}>게시글</h1>
      </div>
    </div>
  )
}