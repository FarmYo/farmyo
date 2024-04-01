package com.ssafy.farmyo.chat.service;

import com.ssafy.farmyo.chat.dto.*;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface ChatService {
//    void sendMsg(ChatMessageDto messageDto);
    List<ChatRoomListDto> getChatRooms(String loginId);
    List<MessageListDto> getMessages(int chatId, Authentication authentication);
    ChatDto createChatRoom(ChatRoomDto chatRoomDto);

}

