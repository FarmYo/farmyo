package com.ssafy.farmyo.chat.service;

import com.ssafy.farmyo.chat.dto.ChatDto;
import com.ssafy.farmyo.chat.dto.ChatRoomDto;
import com.ssafy.farmyo.chat.dto.ChatMessageDto;
import com.ssafy.farmyo.chat.dto.MessageListDto;

import java.util.List;

public interface ChatService {
    void sendMsg(ChatMessageDto messageDto);
    List<ChatDto> getChatRooms(String loginId);
    List<MessageListDto> getMessages(int chatId);
    ChatDto createChatRoom(ChatRoomDto chatRoomDto);

}

