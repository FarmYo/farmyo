package com.ssafy.farmyo.chat.dto;

import lombok.Data;

@Data
public class MessageDto {
    private int userId;
    private int chatId;
    private String content;

}
