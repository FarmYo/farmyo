package com.ssafy.farmyo.chat.service;

import com.ssafy.farmyo.chat.dto.ChatMessageDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class RedisPublisher {

    private final RedisTemplate<String, Object> redisTemplate;

    public RedisPublisher(@Qualifier("redisChatTemplate") RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void sendMessage(ChatMessageDto chatMessageDto) {
        redisTemplate.convertAndSend("/sub/chat/" + chatMessageDto.getChatId(), chatMessageDto);
    }

}
