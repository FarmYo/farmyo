package com.ssafy.farmyo.chat.service;

import com.ssafy.farmyo.chat.dto.ChatDto;
import com.ssafy.farmyo.chat.dto.ChatRoomDto;
import com.ssafy.farmyo.chat.dto.MessageDto;
import com.ssafy.farmyo.chat.dto.MessageListDto;
import com.ssafy.farmyo.chat.repository.ChatRepository;
import com.ssafy.farmyo.chat.repository.MessageRepository;
import com.ssafy.farmyo.common.exception.CustomException;
import com.ssafy.farmyo.common.exception.ExceptionType;
import com.ssafy.farmyo.entity.Chat;
import com.ssafy.farmyo.entity.Message;
import com.ssafy.farmyo.entity.User;
import com.ssafy.farmyo.user.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class ChatServiceImpl implements ChatService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final UserRepository userRepository;
    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;

    public ChatServiceImpl(@Qualifier("redisMsgTemplate")RedisTemplate<String, Object> redisTemplate,
                           UserRepository userRepository,
                           ChatRepository chatRepository,
                           MessageRepository messageRepository) {
        this.redisTemplate = redisTemplate;
        this.userRepository = userRepository;
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
    }

    @Override
    @Transactional
    public ChatDto createChatRoom(ChatRoomDto chatRoomDto) {

        // 임시 저장
        chatRepository.findById(chatRoomDto.getBoardId());

        return null;
    }

    @Override
    @Transactional
    public void publishMsg(MessageDto messageDto) {
        Chat chat;

        if (chatRepository.findById(messageDto.getChatId()).isPresent()) {
            chat = chatRepository.findById(messageDto.getChatId()).get();
        } else {
            throw new CustomException(ExceptionType.CHAT_NOT_EXIST);
        }

        Message message = Message.builder()
                .chat(chat)
                .content(messageDto.getContent())
                .userId(messageDto.getUserId())
                .build();

        // 채팅 기록 DB에 저장하기
        Message savedMessage = messageRepository.save(message);

        // 채팅 내용 redis 서버로 실시간 전송하기
        redisTemplate.convertAndSend(Integer.toString(messageDto.getChatId()), messageDto.getContent());
    }

    @Override
    public List<ChatDto> getChatRooms(String loginId) {
        log.info("userId : {}", loginId);
        User user;

        if (userRepository.findByLoginId(loginId).isPresent()) {
            user = userRepository.findByLoginId(loginId).get();
        } else {
            throw new CustomException(ExceptionType.USER_NOT_EXIST);
        }

        List<ChatDto> result;

        log.info("userJob : {}", user.getJob());
        log.info("userId : {}", user.getId());

        // 농부이면
        if(user.getJob() == 0) {
            result = chatRepository.findAllBySellerId(user.getId());
        }
        // 상인이면
        else {
            result = chatRepository.findAllByBuyerId(user.getId());
        }

        return result;
    }

    @Override
    public List<MessageListDto> getMessages(int chatId) {
        log.info("chatId : {} ", chatId);

        List<MessageListDto> result = messageRepository.findAllById(chatId);

        return result;
    }

}
