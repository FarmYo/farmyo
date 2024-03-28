import { useState,useEffect } from "react"
import ArticleList from "../../../component/mypage/articlelist"
import Favorite from "../../../component/mypage/favorite"
import { useParams } from "react-router-dom"
import Me from "../../../image/component/me.png"


export default function OpponentBuyer (){
  const param = useParams()
  const [selected,setSelected] = useState(null)
  const nickname = param.nickname

  useEffect(()=>{
    setSelected(0);
  },[])

  const handleClick = (index) => {
    setSelected(index)
  }


  return(
    <div>
      <div style={{height:50,backgroundColor:'#1B5E20'}}>
        <div className="p-2 flex justify-between">
          <h1 className="text-xl font-bold" style={{color:"white"}}>{nickname}님의 페이지</h1>
        </div>
      </div>
      <div className='flex border-b-2 border-gray-300' style={{height:120}}>
        <div className='p-5'>
          <img src={Me} alt="" style={{ height:80,width:80}}/>
        </div>
        <div className='p-5'>
          <h1 className='font-bold'>{nickname}</h1>
          <h4 className='text-sm'>대구광역시 달서구 호산로 126</h4>
          <h4 className='text-sm'style={{color:'gray'}}>상태메시지 입니다</h4>
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