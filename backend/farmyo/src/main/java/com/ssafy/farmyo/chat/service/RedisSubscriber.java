package com.ssafy.farmyo.chat.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.farmyo.chat.dto.ChatMessageDto;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class RedisSubscriber implements MessageListener {

    private final RedisTemplate<String, Object> redisTemplate;
    private final SimpMessageSendingOperations messagingTemplate;
    private final ChatService chatService;
    private final ObjectMapper objectMapper;

    public RedisSubscriber(@Qualifier("redisChatTemplate")RedisTemplate<String, Object> redisTemplate,
                           SimpMessageSendingOperations messagingTemplate,
                           ChatService chatService,
                           ObjectMapper objectMapper) {

        this.redisTemplate = redisTemplate;
        this.messagingTemplate = messagingTemplate;
        this.chatService = chatService;
        this.objectMapper = objectMapper;
    }


    // 메세지를 받았을 때 MessageListener는 onMessage 메서드를 호출한다.
    @Override
    public void onMessage(Message message, byte[] pattern) {
        log.info("String Message received: {}", message);

        try {
            // 받은 메세지 분해해서 chatMessageDto로 parsing 해주기
            ChatMessageDto chatMessageDto = objectMapper.readValue(message.getBody(), ChatMessageDto.class);

            log.info("받은 메세지 : {}", message);
            log.info("Sender : {}", chatMessageDto.getUserId());
            log.info("chatRoomId : {}", chatMessageDto.getChatId());
            log.info("Sender 가 보낸 내용 : {}", chatMessageDto.getContent());
//            log.info("Sender 가 보낸 시간 : {}", chatMessageDto.getCreatedAt());

            // 웹소켓으로 연결된 곳에
            messagingTemplate.convertAndSend("/sub/chat/" + chatMessageDto.getChatId(), chatMessageDto);

        } catch (Exception e) {
            log.debug("error : ", e);
        }
    }
}
