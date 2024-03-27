package com.ssafy.farmyo.chat.service;

import com.ssafy.farmyo.board.repository.BoardRepository;
import com.ssafy.farmyo.chat.dto.ChatDto;
import com.ssafy.farmyo.chat.dto.ChatRoomDto;
import com.ssafy.farmyo.chat.dto.MessageDto;
import com.ssafy.farmyo.chat.dto.MessageListDto;
import com.ssafy.farmyo.chat.repository.ChatRepository;
import com.ssafy.farmyo.chat.repository.MessageRepository;
import com.ssafy.farmyo.common.exception.CustomException;
import com.ssafy.farmyo.common.exception.ExceptionType;
import com.ssafy.farmyo.entity.Board;
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
import java.util.Optional;

@Service
@Slf4j
public class ChatServiceImpl implements ChatService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final UserRepository userRepository;
    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;
    private final BoardRepository boardRepository;

    public ChatServiceImpl(@Qualifier("redisMsgTemplate")RedisTemplate<String, Object> redisTemplate,
                           UserRepository userRepository,
                           ChatRepository chatRepository,
                           MessageRepository messageRepository,
                           BoardRepository boardRepository) {
        this.redisTemplate = redisTemplate;
        this.userRepository = userRepository;
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
        this.boardRepository = boardRepository;
    }

    @Override
    @Transactional
    public ChatDto createChatRoom(ChatRoomDto chatRoomDto) {

        ChatDto chatDto;
        // 이미 기존에 채팅방이 있으면 기존의 채팅방 정보 리턴하기
        if (chatRepository.findById(chatRoomDto.getBoardId()).isPresent()) {
            Optional<Chat> chat = chatRepository.findById(chatRoomDto.getBoardId());

            chatDto = new ChatDto(chatRoomDto.getBoardId(), chatRoomDto.getBuyerId(), chatRoomDto.getSellerId());

        }
        // 기존 채팅방이 없다면 만들고 리턴해주기
        else {

            Board board = boardRepository.findById(chatRoomDto.getBoardId()).orElseThrow(() -> new CustomException(ExceptionType.BOARD_NOT_EXIST));
            User buyer = userRepository.findById(chatRoomDto.getBuyerId()).orElseThrow(() -> new CustomException(ExceptionType.USER_NOT_EXIST));
            User seller = userRepository.findById(chatRoomDto.getBuyerId()).orElseThrow(() -> new CustomException(ExceptionType.USER_NOT_EXIST));

            Chat chat = Chat.builder()
                    .board(board)
                    .buyer(buyer)
                    .seller(seller)
                    .build();

            Chat savedChat = chatRepository.save(chat);

            chatDto = new ChatDto(chat.getId(), buyer.getId(), seller.getId());
        }
        return chatDto;
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
