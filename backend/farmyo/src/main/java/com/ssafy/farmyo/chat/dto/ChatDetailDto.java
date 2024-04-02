package com.ssafy.farmyo.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChatDetailDto {
    private String userNickname;  //상대방의 닉네임
    private String userProfile;  // 상대방의 사진
}
