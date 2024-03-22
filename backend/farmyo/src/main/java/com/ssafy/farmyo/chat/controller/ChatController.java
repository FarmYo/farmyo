package com.ssafy.farmyo.chat.controller;

import com.ssafy.farmyo.chat.dto.ChatDto;
import com.ssafy.farmyo.chat.dto.MessageDto;
import com.ssafy.farmyo.chat.service.ChatService;
import com.ssafy.farmyo.common.response.BaseResponseBody;
import com.ssafy.farmyo.entity.Chat;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    @PostMapping("/message")
    @Operation(summary = "유저 채팅 전송", description = "roomId인 채팅방에 message를 전송하고 DB에 저장한다.")
    @ApiResponse(responseCode = "200", description = "성공 \n\n Success 반환")
    public void sendMessage(
            @RequestBody
            @Parameter(description = "roomId , message 가 포함된 MessageDto")
            MessageDto messageDto) {
        chatService.publishMsg(messageDto);
    }

    @GetMapping("/rooms/{userId}")
    @Operation(summary = "유저 채팅방 목록 조회", description = "해당 유저의 채팅방 목록을 조회한다.")
    @ApiResponse(responseCode = "200", description = "성공 \n\n Success 반환")
    public ResponseEntity<? extends BaseResponseBody> getChatRooms (
            @PathVariable
            @Parameter(description = "채팅방 목록을 조회할 유저의 아이디")
            int userId
    ) {
        List<ChatDto> chatList = chatService.getChatRooms(userId);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, chatList));
    }
}
