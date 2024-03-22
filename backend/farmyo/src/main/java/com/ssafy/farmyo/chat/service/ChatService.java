package com.ssafy.farmyo.chat.service;

import com.ssafy.farmyo.chat.dto.ChatDto;
import com.ssafy.farmyo.chat.dto.MessageDto;
import com.ssafy.farmyo.entity.Chat;

import java.util.List;

public interface ChatService {
    void publishMsg(MessageDto messageDto);
    List<ChatDto> getChatRooms(int userId);
}
