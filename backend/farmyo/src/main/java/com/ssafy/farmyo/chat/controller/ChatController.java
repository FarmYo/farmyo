package com.ssafy.farmyo.chat.controller;

import com.ssafy.farmyo.chat.dto.ChatDto;
import com.ssafy.farmyo.chat.dto.MessageDto;
import com.ssafy.farmyo.chat.dto.MessageListDto;
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
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/chats")
@RequiredArgsConstructor
@Tag(name="5.CHAT", description="CHAT API")
public class ChatController {

    private final ChatService chatService;
    @PostMapping("/message")
    @Operation(summary = "유저 채팅 전송", description = "chatId인 채팅방에 메세지를 전송하고 DB에 저장한다.")
    @ApiResponse(responseCode = "200", description = "성공 \n\n Success 반환")
    public ResponseEntity<? extends BaseResponseBody> sendMessage (
            @RequestBody
            @Parameter(description = "chatId , content, userId 가 포함된 MessageDto")
            MessageDto messageDto) {
        chatService.publishMsg(messageDto);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, "Success"));
    }

    @GetMapping("/rooms/{loginId}")
    @Operation(summary = "유저 채팅방 목록 조회", description = "해당 유저의 채팅방 목록을 조회한다.")
    @ApiResponse(responseCode = "200", description = "성공 \n\n 채팅방 목록 반환")
    public ResponseEntity<? extends BaseResponseBody> getChatRooms (
            @PathVariable
            @Parameter(description = "채팅방 목록을 조회할 유저의 아이디")
            String loginId
    ) {
        List<ChatDto> chatList = chatService.getChatRooms(loginId);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, chatList));
    }

    @GetMapping("/message/{chatId}")
    @Operation(summary = "채팅 내역 조회", description = "해당 채팅방의 채팅 내역들을 조회한다.")
    @ApiResponse(responseCode = "200", description = "성공 \n\n 채팅 내역 리스트 반환")
    public ResponseEntity<? extends BaseResponseBody> getMessages (
            @PathVariable
            @Parameter(description = "채팅 내역을 조회할 채팅방 아이디")
            int chatId
    ) {
        List<MessageListDto> messageList = chatService.getMessages(chatId);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, messageList));
    }
}
