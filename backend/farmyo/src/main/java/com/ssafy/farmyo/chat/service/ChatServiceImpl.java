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
import com.ssafy.farmyo.entity.Message;
import com.ssafy.farmyo.entity.User;
import com.ssafy.farmyo.user.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
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
    public ChatRoomResultDto getChatRooms(String loginId) {
        log.info("userId : {}", loginId);
        User user;

        ChatRoomResultDto chatRoomResultDto = new ChatRoomResultDto();

        if (userRepository.findByLoginId(loginId).isPresent()) {
            user = userRepository.findByLoginId(loginId).get();
        } else {
            throw new CustomException(ExceptionType.USER_NOT_EXIST);
        }

        List<ChatRoomListDto> resultList;

        // 농부이면
        if(user.getJob() == 0) {
            resultList = chatRepository.getChatRoomListWhenSeller(user.getId());

            // getChatRoomListWhenSeller 쿼리가 너무 복잡해서 추가하기보다 새로 쿼리 날리는 방식으로 추가함
            for(ChatRoomListDto c : resultList) {
                c.setBoardTitle(chatRepository.getBoardTitleById(c.getChatId()).get());
                c.setUnreadCount(messageRepository.getSellerUnreadMessageCount(c.getChatId()));
            }
        }
        // 상인이면
        else {
            resultList = chatRepository.getChatRoomListWhenBuyer(user.getId());

            for(ChatRoomListDto c : resultList) {
                c.setBoardTitle(chatRepository.getBoardTitleById(c.getChatId()).get());
                c.setUnreadCount(messageRepository.getBuyerUnreadMessageCount(c.getChatId()));
            }
        }
        chatRoomResultDto.setResultList(resultList);

        return chatRoomResultDto;
    }

    @Override
    public MessageListDto getMessages(int chatId, Authentication authentication, int page, int size, int msgId) {

        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        log.info("getMessages -> chatId : {} ", chatId);

        MessageListDto messageListDto = new MessageListDto();

        // MessageListDto 의 위에부분 채우기 ( ChatDetailDto )

        // 사용자의 직업 가져오기   0 : 농부  1 : 일반인
        int job = customUserDetails.getJob();

        // 만약 해당 사람이 판매자면
        if (job == 0) {
            // 상대방의 닉네임과
            ChatDetailDto chatDetailDto = chatRepository.getChatDetailWhenSeller(chatId).get();
            chatDetailDto.setBoardId(chatRepository.getBoardIdById(chatId).get());

            messageListDto.setChatDetailDto(chatDetailDto);

        } else {
            ChatDetailDto chatDetailDto = chatRepository.getChatDetailWhenBuyer(chatId).get();
            chatDetailDto.setBoardId(chatRepository.getBoardIdById(chatId).get());

            messageListDto.setChatDetailDto(chatDetailDto);
        }

        // MessageListDto 의 아랫부분 채우기 ( MessageDetailDto )
        if ( msgId == 0 ) {
            // msgId 가 0 으로 왔다면 ( 가장 최근 개수 만큼 불러오기 )
            List<MessageDetailDto> resultList = messageRepository.findAllById(chatId, PageRequest.of(page, size));
            Collections.reverse(resultList);
            messageListDto.setMessageDetailDtoList(resultList);
        } else {
            // msgId가 0이 아니라면 msgId 보다 작은 애들중에서 몇개 가져오기
            List<MessageDetailDto> resultList = messageRepository.findAllById(chatId, msgId, PageRequest.of(page, size));
            Collections.reverse(resultList);
            messageListDto.setMessageDetailDtoList(resultList);
        }

        return messageListDto;
    }

    @Override
    @Transactional
    public void readMessages(int chatId, Authentication authentication) {
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        int job = customUserDetails.getJob();

        // 농부이면
        if (job == 0) {
            messageRepository.readSellerMessages(chatId);
        } else {
            // 구매자면
            messageRepository.readBuyerMessages(chatId);
        }
    }
}
