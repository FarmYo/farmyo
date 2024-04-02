package com.ssafy.farmyo.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class MessageDetailDto {
    private int userId; // 누가 보냈는지
    private String content;  // 무슨 내용을
    private LocalDateTime createdAt;  // 언제
}
