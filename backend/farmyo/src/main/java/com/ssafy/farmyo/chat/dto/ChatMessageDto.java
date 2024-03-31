package com.ssafy.farmyo.chat.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ChatMessageDto {
    private int userId;
    private int chatId;
    private String content;
    private LocalDateTime sendTime;
}
