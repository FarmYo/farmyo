package com.ssafy.farmyo.chat.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MessageListDto {

    private int userId;
    private String userNickname;
    private String content;
    private LocalDateTime createdAt;

    public MessageListDto(int userId, String userNickname, String content, LocalDateTime createdAt) {
        this.userId = userId;
        this.userNickname = userNickname;
        this.content = content;
        this.createdAt = createdAt;
    }
}
