package com.ssafy.farmyo.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class MessageDetailDto {
    private int userId;
    private String content;
    private LocalDateTime createdAt;
}
