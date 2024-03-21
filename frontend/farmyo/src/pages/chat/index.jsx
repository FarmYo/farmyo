// import { useTokenCheck } from '../../feature/login/receiveToken';
import Photo from '../../image/component/me.png'
import { useState, useEffect } from 'react'

export default function Chatting(){
  // const isAuthed = useTokenCheck();
  const [chattingList, setChattingList] = useState([
    {
      id: 1,
      name: '차은우보다현준',
      message: '감사합니다!! 많이 파세요!',
      photoSrc: Photo, 
    },
    {
      id: 2,
      name: '차은우보다현준',
      message: '감사합니다!! 많이 파세요!',
      photoSrc: Photo, 
    },
  ]);

useEffect(() => {
  // if (isAuthed) {

  // }
})

  return(
    <div>
      <div style={{height:50,backgroundColor:'#1B5E20'}} className="p-2 flex items-center mb-3">
        <h1 className="text-xl font-bold" style={{color:"white"}}>채팅</h1>
      </div>
      {/* 채팅목록나옴 */}
      {chattingList.map((chat) => (
        <div key={chat.id} className='p-3 flex border-b-2 border-gray-100'>
          <div>
            {/* 채팅 상대방 프로필 사진 나옴 */}
            <img src={chat.photoSrc} alt="" style={{width: 50}}/>
          </div>
          <div className='ml-3'>
            <h1 className='font-bold'>{chat.name}</h1>
            <h1 className='text-sm'>{chat.message}</h1>
          </div> 
        </div>
      ))}
    </div>
  )
}