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
  const size = 30
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

  const getMessage = async () => {
    try {
      
      const res = await api.get(`chats/message/${chatId}?page=0&size=${size}&msgId=${msgId}`);
      console.log("채팅 데이터 받아오기");
      setPartnerInfo(res.data.dataBody.chatDetailDto);
      setChatData([...res.data.dataBody.messageDetailDtoList, ...chatData]);
      console.log("확인",res.data.dataBody.messageDetailDtoList)
      console.log(haveMore)
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

  // const cachMessage = useMemo(() => getMessage(), [chatData])
  // const debouncedGetMessage = useMemo(() => debounce(getMessage, 500), []);
  // useEffect(() => {
  //   if (cachMessage) {
  //     setChatData(cachMessage.dataBody.messageDetailDtoList);
  //     setPartnerInfo(cachMessage.dataBody.chatDetailDto);
  //   } else {
  //     debouncedGetMessage();
  //   }
  // }, [cachMessage, chatData]);

  const [bubbleWidth, setBubbleWidth] = useState(null);
  useEffect(() => {
    if (textRef.current) {
      const contentWidth = textRef.current.offsetWidth + 20;
      setBubbleWidth(contentWidth);
    }
  }, []);



  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      {/* 채팅방 */}
      <Headerbar title="채팅"></Headerbar>
      <div className="m-14"></div>
      
      <ChatHeader partnerInfo={partnerInfo}></ChatHeader>
      
      {/* 대화말풍선 - 나 */}
      {/* 대화말풍선 - 상대방 */}
      <div ref={obsRef}><br/></div>

      <div style={{ height: "60px"}}></div>
      <div className="w-full top-100px h-screen">
        {/* 이전 대화내용 불러오기 */}
        {chatData &&
          chatData.map((chat, index) => <ChatLogs key={index} chat={chat} partnerInfo={partnerInfo} />)}
        {/* 실시간 채팅 내용 불러오기 */}
        {messages &&
          messages.map((messages, index) => <ChatLogs key={index} chat={messages} partnerInfo={partnerInfo} />)}
        <div style={{ height: "60px"}}></div>
      </div>
      <div ref={messageEndRef}></div>


      <div>
        {/* 채팅입력창 */}
        <MessageInput stompClient={stompClient} chatId={chatId} />
        {/* 채팅입력창 */}
      </div>
    </div>
  );
}
