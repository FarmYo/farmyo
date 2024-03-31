package com.ssafy.farmyo.chat.dto;

import lombok.Data;

import java.awt.*;
import java.time.LocalDateTime;

@Data
public class ChatMessageDto {
//    public enum MessageType {
//        ENTER, TALK, EXIT
//    }

    private int userId;
    private int chatId;
    private String content;
//    private MessageType type;
//    private LocalDateTime createdAt;
}
