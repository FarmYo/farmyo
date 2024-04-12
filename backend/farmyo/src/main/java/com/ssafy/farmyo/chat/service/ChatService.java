package com.ssafy.farmyo.chat.service;

import com.ssafy.farmyo.chat.dto.*;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface ChatService {
    ChatRoomResultDto getChatRooms(String loginId);
    MessageListDto getMessages(int chatId, Authentication authentication, int page, int size, int msgId);
    ChatDto createChatRoom(ChatRoomDto chatRoomDto);
    void readMessages(int chatId, Authentication authentication);

}

