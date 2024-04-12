import React, { useState, useEffect} from 'react';
import Vector from '../../../image/component/Vector.png';
import { jwtDecode } from 'jwt-decode';

export default function MessageInput({ stompClient, chatId}) {
    
    const [talk, setTalk] = useState("");
    const myId = jwtDecode(localStorage.getItem('access')).userId; 

    const sendMessage = () => {
        if (stompClient.current && stompClient.current.connected && talk.trim() !== '') {
          stompClient.current.send(
            '/pub/chat/message',
            {},
            JSON.stringify({
              chatId: chatId,
              userId: myId, // 여기서 userId는 현재 로그인한 사용자의 ID로 변경해야 합니다.
              content: talk,
            })
          );
          setTalk(''); // 메시지 전송 후 입력 필드 초기화
        }
      };

    return (
        <>
            {/* <div className='p-3 flex'  style={{ position: 'fixed', bottom: keyboardVisible ? '0vh' : 10, left: '0', width: '100%', padding: '10px', boxSizing: 'border-box,', backgroundColor:'#FFFFFF' }}> */}
            <div className="flex bg-white fixed bottom-0 w-full max-w-[500px] pr-2 pl-2 pb-3">  
                <input value={talk} onChange={(event) => setTalk(event.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { sendMessage(talk) } }} id="" name="" type="text" placeholder="" autoComplete="text" className="block h-10 pl-5 w-full rounded-3xl border-0 py-1 text-gray-800 ring-2 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6" />
                <div style={{backgroundColor:'#D3D3D3'}} className='rounded-3xl w-12 flex justify-center items-center ml-1'>
                <div><img onClick={() => sendMessage(talk)} src={Vector} alt="" style={{ width:20,height:20}}/></div>
                </div>
            </div>
        </> 
    ); 
}