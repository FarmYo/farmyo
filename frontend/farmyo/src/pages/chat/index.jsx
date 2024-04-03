// import { useTokenCheck } from '../../feature/login/receiveToken';
import { jwtDecode } from 'jwt-decode'
import api from '../../api/api'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Headerbar from '../../component/common/headerbar'

export default function Chatting(){
  const navigate = useNavigate()
  // const isAuthed = useTokenCheck();
  const [chattingData, setChattingData] = useState([])
  const loginId = jwtDecode(localStorage.getItem('access')).loginId
  const showChattings = (() => {
    api.get(`chats/rooms/${loginId}`)
    .then((res) => {
      console.log('채팅방 목록 불러오기 성공', res)
      setChattingData(res.data.dataBody.resultList)

    })
    .catch((err) => {
      console.log('채팅방 목록 불러오기 실패', err)
    })
  })

useEffect(() => {
  showChattings()
}, [])

  return(
    <div>
      <Headerbar title="채팅"></Headerbar>
      <div className="m-14"></div>
      
      {/* 채팅목록나옴 */}
      {chattingData.map((chat) => (
        <div onClick={() => {navigate(`/chat/${chat.chatId}`)}} key={chat.chatId} className='p-3 flex border-b-2 border-gray-100'>
          <div>
            {/* 채팅 상대방 프로필 사진 나옴 */}
            <img src={chat.userProfile} alt="" style={{width: 50}}/>
          </div>
          <div className='ml-3'>
            <h1 className='font-bold'>{chat.userNickname}</h1>
            <h1 className='text-sm'>{chat.recentMessage}</h1>
          </div> 
        </div>
      ))}
    </div>
  )
}