package com.ssafy.farmyo.chat.dto;

import lombok.Data;

@Data
public class MessageDto {
    int userId;
    int chatId;
    String content;
}
