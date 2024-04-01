import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

import Back from '../../../image/component/leftarrow.png';
import Photo from '../../../image/component/me.png';
import Form from '../form/index';
import Vector from '../../../image/component/Vector.png';

export default function Room() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [talk, setTalk] = useState("");
  const [messages, setMessages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [buttonText, setButtonText] = useState('거래하기');
  const [buttonBgcolor, setButtonBgcolor] = useState('#1B5E20');
  const textRef = useRef(null);
  const [width, setWidth] = useState(120); 
  const textRef2 = useRef(null);
  const [width2, setWidth2] = useState(120); 
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const stompClient = useRef(null);

  useEffect(() => {
    const socket = new SockJS('https://j10d209.p.ssafy.io/api/ws/chat');
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect({}, function(frame) {
      console.log('Connected: ' + frame);

      stompClient.current.subscribe(`/sub/chat/room/${chatId}`, function(message) {
        const newMessage = JSON.parse(message.body);
        setMessages(prevMessages => [...prevMessages, newMessage]);
      });
    });

    return () => {
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.disconnect();
      }
    };
  }, [chatId]);

  const sendMessage = () => {
    if (stompClient.current && stompClient.current.connected && talk.trim() !== '') {
      stompClient.current.send(
        '/pub/chat/message',
        {},
        JSON.stringify({
          chatId: chatId,
          userId: 1, // 여기서 userId는 현재 로그인한 사용자의 ID로 변경해야 합니다.
          content: talk,
        })
      );
      setTalk(''); // 메시지 전송 후 입력 필드 초기화
    }
  };





  const openForm = () =>{
    setShowForm(true)
    setButtonText('거래하기')
    setButtonBgcolor('#1B5E20')
  }

  const goBack = () => {
    navigate('/chat');
  }

  const handleFormSubmit = () => {
    setShowForm(false)
    setButtonText('전송완료')
    setButtonBgcolor('#8FBC8F')
  }

  const closeForm = () =>{
    setShowForm(false)
  }

  return(
    <div>
      <div style={{height:50,backgroundColor:'#1B5E20'}} className="p-2 flex items-center">
        <h1 className="text-xl font-bold" style={{color:"white"}}>채팅</h1>
      </div>
      <div style={{height:80}} className="p-2 border-b-2 border-gray-100 flex justify-between">
        <div className='flex'>
          <div className='flex items-center' onClick={goBack}><img src={Back} alt="" style={{ width:25,height:25 }}/></div>
          <div className='text-lg flex items-center font-bold ml-5'>차은우보다현준</div>
        </div>
        {/* 아래거래하기버튼은 판매자만보이게 */}
        <div className='flex items-center'>
          <button className="btn" style={{ backgroundColor: buttonBgcolor}}> 
            <div className="font-bold text-md" style={{ color:'white' }}
            onClick={buttonText === '전송완료' ? null : openForm}
          >{buttonText}</div>
          </button>
        </div>
      </div>
      {/* 거래하기눌렀을때 입력폼- 판매게시판에서 만든 채팅은 작물명X,구매게시판에서 만든채팅은 작물명O*/}
      {showForm && <Form onFormSubmit={handleFormSubmit} onCloseForm={closeForm} />}
      {/* 대화말풍선 - 상대방 */}
      <div className='flex p-3'>
        <img src={Photo} alt="" style={{ width:40,height:40 }}/>
        <div style={{width:`${width2}px`,backgroundColor:'#D3D3D3'}} className='rounded-3xl ml-3 flex justify-center items-center'>
          <div ref={textRef2}>판매자님</div>
        </div>
      </div>
      {/* 대화말풍선 - 나 */}
      <div className='flex p-3 justify-end'>
        <div style={{width:`${width}px`,height:40,backgroundColor:'#8FBC8F'}} className='rounded-3xl ml-3 flex justify-center items-center'>
          <div ref={textRef}>안녕하세요</div>
        </div>
      </div>
      {/* 채팅입력창 */}
      <div className='p-3 flex'  style={{ position: 'fixed', bottom: keyboardVisible ? '0vh' : 10, left: '0', width: '100%', padding: '10px', boxSizing: 'border-box' }}>
        <input value={talk} onChange={(event) => setTalk(event.target.value)} id="" name="" type="text" placeholder="" autoComplete="text" 
        className="block h-10 pl-5 w-full rounded-3xl border-0 py-1 text-gray-800 ring-2 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
        />
        <div style={{backgroundColor:'#D3D3D3'}} className='rounded-3xl w-12 flex justify-center items-center ml-1'>
          <div><img onClick={() => sendMessage(talk)} src={Vector} alt="" style={{ width:20,height:20}}/></div>
        </div>
      </div> 
    </div>
  )
}