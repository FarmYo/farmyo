package com.ssafy.farmyo.chat.service;

import com.ssafy.farmyo.board.repository.BoardRepository;
import com.ssafy.farmyo.chat.dto.*;
import com.ssafy.farmyo.chat.repository.ChatRepository;
import com.ssafy.farmyo.chat.repository.MessageRepository;
import com.ssafy.farmyo.common.auth.CustomUserDetails;
import com.ssafy.farmyo.common.exception.CustomException;
import com.ssafy.farmyo.common.exception.ExceptionType;
import com.ssafy.farmyo.entity.Board;
import com.ssafy.farmyo.entity.Chat;
import com.ssafy.farmyo.entity.User;
import com.ssafy.farmyo.user.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final UserRepository userRepository;
    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;
    private final BoardRepository boardRepository;

    @Override
    @Transactional
    public ChatDto createChatRoom(ChatRoomDto chatRoomDto) {

        ChatDto chatDto;
        // 이미 기존에 채팅방이 있으면 기존의 채팅방 정보 리턴하기
        if (chatRepository.findByBoardIdAndSellerIdAndBuyerId(chatRoomDto.getBoardId(), chatRoomDto.getSellerId(), chatRoomDto.getBuyerId()).isPresent()) {
            Chat chat = chatRepository.findByBoardIdAndSellerIdAndBuyerId(chatRoomDto.getBoardId(), chatRoomDto.getSellerId(), chatRoomDto.getBuyerId()).get();

            chatDto = new ChatDto(chatRoomDto.getBoardId(), chatRoomDto.getBuyerId(), chatRoomDto.getSellerId());
        }
        // 기존 채팅방이 없다면 만들고 리턴해주기
        else {
            Board board = boardRepository.findById(chatRoomDto.getBoardId()).orElseThrow(() -> new CustomException(ExceptionType.BOARD_NOT_EXIST));
            User buyer = userRepository.findById(chatRoomDto.getBuyerId()).orElseThrow(() -> new CustomException(ExceptionType.USER_NOT_EXIST));
            User seller = userRepository.findById(chatRoomDto.getSellerId()).orElseThrow(() -> new CustomException(ExceptionType.USER_NOT_EXIST));

            Chat chat = Chat.builder()
                    .board(board)
                    .buyer(buyer)
                    .seller(seller)
                    .build();

            Chat savedChat = chatRepository.save(chat);

            chatDto = new ChatDto(savedChat.getId(), savedChat.getBuyer().getId(), savedChat.getSeller().getId());
        }

        return chatDto;
    }

    @Override
    @Transactional
    public List<ChatRoomListDto> getChatRooms(String loginId) {
        log.info("userId : {}", loginId);
        User user;

        if (userRepository.findByLoginId(loginId).isPresent()) {
            user = userRepository.findByLoginId(loginId).get();
        } else {
            throw new CustomException(ExceptionType.USER_NOT_EXIST);
        }

        List<ChatRoomListDto> resultList;

        // 농부이면
        if(user.getJob() == 0) {
            resultList = chatRepository.getChatRoomListWhenSeller(user.getId());
        }
        // 상인이면
        else {
            resultList = chatRepository.getChatRoomListWhenBuyer(user.getId());
        }

        return resultList;
    }

    @Override
    public MessageListDto getMessages(int chatId, Authentication authentication, int page, int size) {

        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        log.info("getMessages -> chatId : {} ", chatId);

        MessageListDto messageListDto = new MessageListDto();

        // MessageListDto 의 위에부분 채우기

        // 사용자의 직업 가져오기   0 : 농부  1 : 일반인
        int job = customUserDetails.getJob();

        // 만약 해당 사람이 판매자면
        if (job == 0) {
            // 상대방의 닉네임과
            messageListDto.setChatDetailDto(chatRepository.getChatDetailWhenSeller(chatId).get());
        } else {
            messageListDto.setChatDetailDto(chatRepository.getChatDetailWhenBuyer(chatId).get());
        }

        // MessageListDto 의 아랫부분 채우기
        List<MessageDetailDto> allById = (List<MessageDetailDto>) messageRepository.findAllById(chatId, PageRequest.of(page, size));

        messageListDto.setMessageDetailDtoList(allById);

        return messageListDto;
    }

}
