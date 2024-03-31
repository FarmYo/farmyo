package com.ssafy.farmyo.chat.service;

import com.ssafy.farmyo.chat.dto.ChatMessageDto;
import com.ssafy.farmyo.chat.repository.ChatRepository;
import com.ssafy.farmyo.chat.repository.MessageRepository;
import com.ssafy.farmyo.common.exception.CustomException;
import com.ssafy.farmyo.common.exception.ExceptionType;
import com.ssafy.farmyo.entity.Chat;
import com.ssafy.farmyo.entity.Message;
import com.ssafy.farmyo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@Service
@Slf4j
@RequiredArgsConstructor
public class StompChatServiceImpl implements StompChatService{

    private final UserRepository userRepository;
    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;
    private final SimpMessageSendingOperations messagingTemplate;
    @Override
    @Transactional
    public void saveAndPublish(ChatMessageDto chatMessageDto) {
        log.info("receive message from client : {}", chatMessageDto);

        // 회원 검사
        userRepository.findById(chatMessageDto.getUserId()).orElseThrow(() -> new CustomException(ExceptionType.USER_NOT_EXIST));

        // 채팅 방 검사
        Chat chat = chatRepository.findById(chatMessageDto.getChatId()).orElseThrow(() -> new CustomException(ExceptionType.CHAT_NOT_EXIST));

        Message message = Message.builder()
                .chat(chat)
                .content(chatMessageDto.getContent())
                .userId(chatMessageDto.getUserId())
                .build();

        // 메세지가 전달받은 시간 넣어서 전달해주기 ( 프론트에서 메세지 입력한 시간을 LocalDateTime 으로 보내 주는게 맞나? )
        chatMessageDto.setSendTime(LocalDateTime.now());

        // 채팅방에 먼저 Pub 해주고 DB에 저장하기.
        messagingTemplate.convertAndSend("/sub/chat/room/" + chatMessageDto.getChatId(), chatMessageDto);

        messageRepository.save(message);
    }
}
