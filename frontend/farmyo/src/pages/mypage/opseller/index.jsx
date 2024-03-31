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
  const loginJob = jwtDecode( localStorage.getItem("access") ).userJob
  const [selected,setSelected] = useState(null)
  const [love,setLove] = useState(false) // 즐겨찾기 여부
  const param = useParams()
  const profileId= param.id
  const [profileNickname,setProfileNickname] = useState(null)
  const [profileAddress,setProfileAddress] = useState(null)
  const [profileComment,setProfileComment] = useState(null)
  const [profileJob,setProfileJob] = useState(null)
  // 아직 프로필url없음
  const [profileUrl,setProfileUrl] = useState(null)
  // 본인이 즐찾한 농부받기
  const [bookmarks, setBookmarks] = useState([])


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
      setProfileJob(res.data.dataBody.job)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[profileId])

  useEffect(()=>{
    if (profileNickname) {
    api.get('users/bookmarks')
    .then((res)=>{
      console.log(res)
      console.log('즐찾농부목록확인')
      const bookmarksData = res.data.dataBody;
      setBookmarks(bookmarksData)
      const isLoved = bookmarksData.some(b => b.farmerName === profileNickname);
      setLove(isLoved); // 즐겨찾기 상태 업데이트
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  },[profileNickname])

  const handleClick = (index) => {
    setSelected(index)
  }

  //즐겨찾기하기
  const handleLove = () =>{
    api.post('users/bookmarks',{
      farmerLoginId: profileId
    })
    .then((res)=>{
      console.log('즐겨찾기성공')
      setLove(true)
         api.get('users/bookmarks')
        .then((res)=>{
        console.log('즐찾농부목록확인')
        setBookmarks(res.data.dataBody)
        })
        .catch((err)=>{
          console.log(err)
        })
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  // 즐겨찾기삭제하기
  const handleDelete = () => {
    const bookmark = bookmarks.find(b => b.farmerName === profileNickname);
    if (bookmark) { // bookmark 객체가 존재하는지 확인
      console.log(bookmark.id);
      api.delete('users/bookmarks', {
        params: {
          bookmarkId: bookmark.id
        }
      })
      .then((res) => {
        console.log(res);
        console.log('즐겨찾기삭제성공');
        setLove(false);
        // 즐겨찾기 목록에서 삭제된 항목 제거
        setBookmarks(bookmarks.filter(b => b.farmerName !== profileNickname));
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      console.log('즐겨찾기에서 해당 농부를 찾을 수 없습니다.');
    }
  };
  
  


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
        { loginJob !== profileJob && (
          <div className='flex justify-center items-center p-4'
          onClick={love ? handleDelete : handleLove}>
            <img src={love ? SaeClick : Sae } alt="" style={{width:50,height:50}} />
          </div>
        )}
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