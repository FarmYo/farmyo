package com.ssafy.farmyo.chat.service;

import com.ssafy.farmyo.chat.dto.ChatDto;
import com.ssafy.farmyo.chat.dto.MessageDto;
import com.ssafy.farmyo.chat.repository.ChatRepository;
import com.ssafy.farmyo.entity.Chat;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
public class ChatServiceImpl implements ChatService {

    private RedisTemplate<String, Object> redisTemplate;

    private ChatRepository chatRepository;

    public ChatServiceImpl(@Qualifier("redisMsgTemplate")RedisTemplate<String, Object> redisTemplate, ChatRepository chatRepository) {
        this.redisTemplate = redisTemplate;
        this.chatRepository = chatRepository;
    }

    @Override
    public void publishMsg(MessageDto messageDto) {
        redisTemplate.convertAndSend(messageDto.getRoomId(), messageDto.getMessage());
    }

    @Override
    public List<ChatDto> getChatRooms(int userId) {
        log.info("userId : " + userId);
        List<ChatDto> list1 = chatRepository.findAllBySellerId(userId);
        List<ChatDto> list2 = chatRepository.findAllByBuyerId(userId);

        list1.addAll(list2);

        return list1;
    }
}
