import Me from '../../../image/component/me.png'
import Sae from '../../../image/component/sae.png'
import SaeClick from '../../../image/component/saeclick.png'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Myfarm from "../../../component/mypage/myfarm"
import Mycrops from '../../../component/mypage/mycrops'
import ArticleList from '../../../component/mypage/articlelist'
import { jwtDecode } from 'jwt-decode'
import api from '../../../api/api'

export default function OpponentSeller (){
  const loginId = jwtDecode( localStorage.getItem("access") ).loginId
  const [selected,setSelected] = useState(null)
  const [love,setLove] = useState(false)
  const param = useParams()
  const profileId= param.id
  const [profileNickname,setProfileNickname] = useState(null)
  const [profileAddress,setProfileAddress] = useState(null)
  const [profileComment,setProfileComment] = useState(null)


  // 프로필 상단바조회
  useEffect(()=>{
    // console.log(profileId)
    setSelected(0);
    api.get('farms/user',{
      params: {
      loginId: profileId
      }
    })    
    .then((res)=>{
      console.log(res)
      console.log('마이페이지 상단정보조회성공')
      setProfileNickname(res.data.dataBody.nickname)
      setProfileAddress(res.data.dataBody.location)
      setProfileComment(res.data.dataBody.comment)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  const handleClick = (index) => {
    setSelected(index)
  }

  //즐겨찾기하기
  const handleLove = () =>{
    // api.post('users/bookmarks',{
    //   farmerId:"33", // 페이지주인농부pk값 넣기
    //   farmerLoginId: loginId
    // })
    // .then((res)=>{
    //   console.log(res)
    //   console.log('즐겨찾기성공')
    //   setLove(!love)
    // })
    // .catch((err)=>{
    //   console.log(err)
    // })
  }

  


  return(
    <div>
      <div style={{height:50,backgroundColor:'#1B5E20'}}>
        <div className="p-2 flex justify-between">
          <h1 className="text-xl font-bold" style={{color:"white"}}>{profileNickname}님의 페이지</h1>
        </div>
      </div>
      <div className='flex border-b-2 border-gray-300' style={{height:140}}>
        <div className='p-5 pt-7'>
          <img src={Me} alt="" style={{ height:80,width:80}}/>
        </div>
        <div className='p-7 pl-3'>
          <h1 className='font-bold'>{profileNickname}</h1>
          <h4 className='text-sm'>{profileAddress}</h4>
          <h4 className='text-sm'style={{color:'gray'}}>{profileComment}</h4>
        </div>
        <div className='flex justify-center items-center p-4' onClick={handleLove}>
          <img src={ love ? SaeClick : Sae} alt="" style={{width:50,height:50}} />
        </div>
      </div>
      <div className='flex justify-around p-3' style={{height:50}}>
        <h1 className='font-bold' style={{ color: selected === 0 ? 'black' : 'gray' }} onClick={()=>{handleClick(0)}}>마이팜</h1>
        <h1 className='font-bold' style={{ color: selected === 1 ? 'black' : 'gray' }} onClick={()=>{handleClick(1)}}>마이작물</h1>
        <h1 className='font-bold' style={{ color: selected === 2 ? 'black' : 'gray' }} onClick={()=>{handleClick(2)}}>게시글</h1>
      </div>
      {/* 선택된 컴포넌트 조건부 렌더링 */}
      {selected === 0 && <Myfarm profileId={profileId}/>}
      {selected === 1 && <Mycrops profileId={profileId}/>}
      {selected === 2 && <ArticleList />}
    </div>
  )
}