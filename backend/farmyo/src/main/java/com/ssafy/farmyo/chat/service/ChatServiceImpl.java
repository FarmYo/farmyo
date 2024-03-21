package com.ssafy.farmyo.chat.service;

import com.ssafy.farmyo.chat.dto.MessageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ChatServiceImpl implements ChatService {

    private RedisTemplate<String, Object> redisTemplate;

    public ChatServiceImpl(@Qualifier("redisMsgTemplate")RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public void publishMsg(MessageDto messageDto) {
        redisTemplate.convertAndSend(messageDto.getRoomId(), messageDto.getMessage());
    }
}
