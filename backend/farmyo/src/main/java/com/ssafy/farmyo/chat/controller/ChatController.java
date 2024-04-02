package com.ssafy.farmyo.chat.controller;

import com.ssafy.farmyo.chat.dto.*;
import com.ssafy.farmyo.chat.service.ChatService;
import com.ssafy.farmyo.common.response.BaseResponseBody;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/chats")
@RequiredArgsConstructor
@Validated
@Tag(name="5.CHAT", description="CHAT API")
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/room")
    @Operation(summary = "채팅 방 생성", description = "이전에 채팅방이 있다면 이전 채팅방 반환 없다면 새로운 방 생성 후 반환")
    @ApiResponse(responseCode = "200", description = "성공 \n\n chatDto 반환")
    public ResponseEntity<? extends BaseResponseBody> createRoom(
            @RequestBody
            ChatRoomDto chatRoomDto
    ) {
        ChatDto chatDto = chatService.createChatRoom(chatRoomDto);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, chatDto));
    }

    @GetMapping("/rooms/{loginId}")
    @Operation(summary = "채팅방 목록 조회", description = "해당 유저의 채팅방 목록을 조회한다. (채팅 탭 눌렀을 때)")
    @ApiResponse(responseCode = "200", description = "성공 \n\n 채팅방 목록 반환 List<ChatRoomListDto>")
    public ResponseEntity<? extends BaseResponseBody> getChatRooms (
            @PathVariable
            @Parameter(description = "채팅방 목록을 조회할 유저의 아이디")
            String loginId
    ) {
        List<ChatRoomListDto> chatList = chatService.getChatRooms(loginId);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, chatList));
    }

    @GetMapping("/message/{chatId}")
    @Operation(summary = "채팅 내역 조회", description = "해당 채팅방의 채팅 내역들을 조회한다.")
    @ApiResponse(responseCode = "200", description = "성공 \n\n 채팅 내역 DTO 반환")
    public ResponseEntity<? extends BaseResponseBody> getMessages (
            @PathVariable
            @Parameter(description = "채팅 내역을 조회할 채팅방 아이디")
            int chatId, Authentication authentication
    ) {
        MessageListDto messageList = chatService.getMessages(chatId, authentication);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, messageList));
    }
}
