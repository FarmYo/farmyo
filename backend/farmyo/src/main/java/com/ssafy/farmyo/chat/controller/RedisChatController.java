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
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

@Slf4j
@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000/", "http://localhost:3001/"})
public class RedisChatController {

    private final ChatService chatService;
    private final RedisPublisher redisPublisher;
    private final RedisSubscriber redisSubscriber;
    private final UserRepository userRepository;
    private final SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/chat/message")
//    @CrossOrigin(origins = {"http://localhost:3001/", "http://localhost:3000/"})
    public void getMessage(ChatMessageDto chatMessageDto) {
//        User user = userRepository.findById(chatMessageDto.getUserId()).orElseThrow(()-> new CustomException(ExceptionType.USER_NOT_EXIST));

//        log.info("socket get user : {}", user);

        log.info("chatMsgDto : {} ", chatMessageDto);

        messagingTemplate.convertAndSend("/sub/chat/room/" + chatMessageDto.getChatId(), chatMessageDto);
    }

}
