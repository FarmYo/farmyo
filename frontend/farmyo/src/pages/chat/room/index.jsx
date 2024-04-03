import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import "../../../css/chat.css";

import Vector from "../../../image/component/Vector.png";
import { jwtDecode } from "jwt-decode";
import api from "../../../api/api";
import Headerbar from "../../../component/common/headerbar";
import ChatHeader from "../../../component/chat/chatHeader";
import ChatLogs from "../../../component/chat/chatLogs";
import MessageInput from '../../../component/chat/chatInput'
  
export default function Room() {
  const { chatId } = useParams();
  const [talk, setTalk] = useState("");
  const [messages, setMessages] = useState([]);
  const textRef = useRef(null);
  const [width, setWidth] = useState(120);
  const textRef2 = useRef(null);
  const [width2, setWidth2] = useState(120);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const stompClient = useRef(null);
  const messageEndRef = useRef(null);
  const checkRead = () => {
    api.put(`chats/message/${chatId}`)
    .then(res => console.log("성공"))
    .catch(err => console.error(err))
  }

  useEffect(() => {
    checkRead()
    return () => {
      checkRead()
    }
  }, [])

  useEffect(() => {
    const socket = new SockJS("https://j10d209.p.ssafy.io/api/ws/chat");
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect({}, function (frame) {
      console.log("Connected: " + frame);

      stompClient.current.subscribe(`/sub/chat/room/${chatId}`, function (message) {
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        console.log(messages);
      });
    });

    return () => {
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.disconnect();
      }
    };
  }, [chatId]);

  const myId = jwtDecode(localStorage.getItem("access")).userId;
  const sendMessage = () => {
    if (stompClient.current && stompClient.current.connected && talk.trim() !== "") {
      stompClient.current.send(
        "/pub/chat/message",
        {},
        JSON.stringify({
          chatId: chatId,
          userId: myId, // 여기서 userId는 현재 로그인한 사용자의 ID로 변경해야 합니다.
          content: talk,
        })
      );
      setTalk(""); // 메시지 전송 후 입력 필드 초기화
    }
  };

  const [partnerInfo, setPartnerInfo] = useState([]);
  const [chatData, setChatData] = useState([]);
  const [msgId, setMsgId] = useState(0);
  const obsRef = useRef(null)
  const preventRef = useRef(true);
  const [haveMore, setHaveMore] = useState(true)
  const size = 60
  const [startFlag, setStartFlag] = useState(true)
  const [flag,setFlag] = useState(0)
  const obsHandler = ((entries) => { //옵저버 콜백함수
    const target = entries[0]
    if(haveMore && target.isIntersecting && chatData && preventRef.current) {//옵저버 중복 실행 방지
      preventRef.current=false
      setFlag(prev => prev+1) //페이지 값 증가
    }
  })

  useEffect(() => {//옵저버 생성
    const observer = new IntersectionObserver(obsHandler, {threshold : 0.5})
    if(obsRef.current) observer.observe(obsRef.current)
    if(!haveMore) {
      observer.disconnect()
    }
    return () => {observer.disconnect()}
  }, [])


  useEffect(() => {
    messageEndRef.current.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    setTimeout(() => {
          messageEndRef.current.scrollIntoView();
    }, 1000);
  },[]);


  let scrollBefore
  let scrollHeightBefore
  const getMessage = async () => {
    try {
      scrollBefore = obsRef.current.scrollTop;
      scrollHeightBefore = obsRef.current.scrollHeight;
      
      const res = await api.get(`chats/message/${chatId}?page=0&size=${size}&msgId=${msgId}`);
      console.log("채팅 데이터 받아오기");
      setPartnerInfo(res.data.dataBody.chatDetailDto);
      setChatData([...res.data.dataBody.messageDetailDtoList, ...chatData]);
      if(startFlag){
        setStartFlag(false)
      } else {

        setTimeout(() => {
  
          const scrollHeightAfter = obsRef.current.scrollHeight;
          // 스크롤 위치를 조정하여 사용자가 이전에 보던 위치를 유지하도록 합니다.
          obsRef.current.scrollTop = scrollBefore + (scrollHeightAfter - scrollHeightBefore);
          console.log()
        }, 1000); // setTimeout은 필요에 따라 조정할 수 있습니다.t
        
      }
      if(res.data.dataBody.messageDetailDtoList.length<size) {
        preventRef.current=false
        setHaveMore(false)
        console.log("끝")
      } else {
        preventRef.current =true
      }
    } catch (err) {
      console.log("채팅 데이터 받아오기 실패", err);
    }
  };


  useEffect(() => {
    if(chatData.length>0 && haveMore && preventRef.current){
      console.log(chatData)
      setMsgId(chatData[0].messageId)
    }
  },[chatData])


  useEffect(() => {
    if(preventRef){

      getMessage();
    }
  }, [flag]);



  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      {/* 채팅방 */}
      <div style={{ marginBottom: "60px" }}>
  {/* 채팅방 */}
  <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
    <Headerbar title="채팅" />
  </div>
  <div style={{ position: "fixed", top: "60px", left: 0, right: 0, zIndex: 999 }}>
    <ChatHeader partnerInfo={partnerInfo} />
  </div>
  <div style={{ paddingTop: "120px" }}>
    {/* 대화말풍선 - 나 */}
    {/* 대화말풍선 - 상대방 */}
    <div ref={obsRef}><br/></div>
    <div>
      {/* 이전 대화내용 불러오기 */}
      {chatData &&
        chatData.map((chat, index) => <ChatLogs key={index} chat={chat} partnerInfo={partnerInfo} />)}
      {/* 실시간 채팅 내용 불러오기 */}
      {messages &&
        messages.map((messages, index) => <ChatLogs key={index} chat={messages} partnerInfo={partnerInfo} />)}
      <div ref={messageEndRef}></div>
    </div>
  </div>
</div>
      <div>
        {/* 채팅입력창 */}
        <MessageInput stompClient={stompClient} chatId={chatId} />
        {/* 채팅입력창 */}
      </div>
    </div>
  );
}
