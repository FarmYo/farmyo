package com.ssafy.farmyo.chat.controller;

import com.ssafy.farmyo.chat.dto.MessageDto;
import com.ssafy.farmyo.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
}
