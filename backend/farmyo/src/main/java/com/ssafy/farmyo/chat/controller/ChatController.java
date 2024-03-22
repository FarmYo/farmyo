package com.ssafy.farmyo.chat.controller;

import com.ssafy.farmyo.chat.dto.MessageDto;
import com.ssafy.farmyo.chat.service.ChatService;
import com.ssafy.farmyo.common.response.BaseResponseBody;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    @PostMapping("/message")
    public void sendMessage(@RequestBody MessageDto messageDto) {
        chatService.publishMsg(messageDto);
    }

    @GetMapping("/rooms")
    public ResponseEntity<? extends BaseResponseBody> getChatRooms(@PathVariable String userId) {

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, chatService));
    }
}
