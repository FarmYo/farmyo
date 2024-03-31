package com.ssafy.farmyo.chat.service;

import com.ssafy.farmyo.chat.dto.*;

import java.util.List;

public interface ChatService {
//    void sendMsg(ChatMessageDto messageDto);
    List<ChatRoomListDto> getChatRooms(String loginId);
    List<MessageListDto> getMessages(int chatId);
    ChatDto createChatRoom(ChatRoomDto chatRoomDto);

}

