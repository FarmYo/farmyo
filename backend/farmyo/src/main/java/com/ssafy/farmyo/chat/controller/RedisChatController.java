package com.ssafy.farmyo.chat.controller;

import com.ssafy.farmyo.chat.dto.ChatMessageDto;
import com.ssafy.farmyo.chat.service.ChatService;
import com.ssafy.farmyo.chat.service.RedisPublisher;
import com.ssafy.farmyo.chat.service.RedisSubscriber;
import com.ssafy.farmyo.common.exception.CustomException;
import com.ssafy.farmyo.common.exception.ExceptionType;
import com.ssafy.farmyo.entity.User;
import com.ssafy.farmyo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class RedisChatController {

    private final ChatService chatService;
    private final RedisPublisher redisPublisher;
    private final RedisSubscriber redisSubscriber;
    private final UserRepository userRepository;

    @MessageMapping("/chat/message")
    public void getMessage(
            ChatMessageDto chatMessageDto
    ) {
        User user = userRepository.findById(chatMessageDto.getUserId()).orElseThrow(()-> new CustomException(ExceptionType.USER_NOT_EXIST));

        redisPublisher.sendMessage(chatMessageDto);
    }

}
