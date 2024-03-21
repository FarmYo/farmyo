package com.ssafy.farmyo.chat.service;

import com.ssafy.farmyo.chat.dto.MessageDto;

public interface ChatService {
    void publishMsg(MessageDto messageDto);

}
