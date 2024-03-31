package com.ssafy.farmyo.chat.service;

import com.ssafy.farmyo.chat.dto.ChatMessageDto;

public interface StompChatService {

    void saveAndPublish(ChatMessageDto chatMessageDto);
}
