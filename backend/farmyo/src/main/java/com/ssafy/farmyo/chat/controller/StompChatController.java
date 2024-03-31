package com.ssafy.farmyo.chat.controller;

import com.ssafy.farmyo.chat.dto.ChatMessageDto;
import com.ssafy.farmyo.chat.service.StompChatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
@Tag(name="8.STOMP_CHAT", description="STOMP CHAT API")
public class StompChatController {

    private final StompChatService stompChatService;
    @MessageMapping("/chat/message")
    @Operation(summary = "유저 실시간 채팅 전달", description = "메세지 저장 및 pub")
    public void saveAndPublish(
            @Parameter(description = "유저가 전송한 메세지 DTO")
            ChatMessageDto chatMessageDto) {
        stompChatService.saveAndPublish(chatMessageDto);
    }
}
