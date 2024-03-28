import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Me from '../../../image/component/me.png'
import Next from '../../../image/component/next.png'
import ArticleList from '../articlelist'
import Favorite from '../favorite'
import api from '../../../api/api'

export default function MypageNavbar() {
  const [userInfo, setUserInfo] = useState([])
  const [selected,setSelected] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    setSelected(0);
    getUserInfo();
  },[])

  const handleClick = (index) => {
    setSelected(index)
  }

  const getUserInfo = (() => {
    api.get('users')
    .then((res) => {
      console.log('정보 받아오기 성공', res.data, res.data.dataBody)
      setUserInfo(res.data.dataBody)
    })
    .catch((err) => {
      console.log('정보 받아오기 실패', err)
    })
  })

  const logOut = (() => {
    api.post('users/logout')
    .then((res) => {
      console.log('로그아웃!')
      localStorage.clear()
      navigate('/login')
    })
    .catch((err) => {
      console.log('로그아웃 안된다 영원히..로그인..상태', err)
    })
  })
  
  //수정페이지로가기
  const GoEdit= () => {
    navigate('/mypage/edit'); // '/mypage/edit' 경로로 이동합니다.
  };

  return(
    <div>
      <div style={{height:50,backgroundColor:'#1B5E20'}}>
        <div className="p-2 flex justify-between">
          <h1 className="text-xl font-bold" style={{color:"white"}}>마이페이지</h1>
          {/* 마이페이지유저와 로그인유저가 일치해야 보이는것 */}
          <button
            onClick={() => logOut()}
            className="text-sm font-bold flex items-center" style={{color:"white"}}>로그아웃</button>
        </div>
      </div>
      <div className='flex border-b-2 border-gray-300'style={{height:130}}>
        <div className='p-5 pt-7'>
          <img src={Me} alt="" style={{ height:80,width:80}}/>
        </div>
        <div className='p-7 pl-3'>
        <h1 className='font-bold'>{userInfo?.nickname}</h1>
        <h4 className='text-sm'>{userInfo?.addressLegal}</h4>
        <h4 className='text-sm'style={{color:'gray'}}>{userInfo?.comment}</h4>
        </div>
        <div className='flex justify-center items-center'>
          <img src={Next} alt="" style={{width:50,height:50}} onClick={GoEdit}/>
        </div>
      </div>
      <div className='flex justify-around p-3' style={{height:50}}>
        <h1 className='font-bold' style={{ color: selected === 0 ? 'black' : 'gray' }} onClick={()=>{handleClick(0)}}>게시글</h1>
        <h1 className='font-bold' style={{ color: selected === 1 ? 'black' : 'gray' }} onClick={()=>{handleClick(1)}}>즐겨찾는 농부</h1>
      </div>
      {selected === 0 && <ArticleList />}
      {selected === 1 && <Favorite />}
    </div>
  )
}