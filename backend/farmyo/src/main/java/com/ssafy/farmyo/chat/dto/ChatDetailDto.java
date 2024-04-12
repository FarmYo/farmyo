package com.ssafy.farmyo.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChatDetailDto {
    private String userLoginId;     // 상대방의 로그인 아이디
    private String userNickname;  //상대방의 닉네임
    private String userProfile;  // 상대방의 사진

    private int boardId;

    public ChatDetailDto(String userLoginId, String userNickname, String userProfile) {
        this.userLoginId = userLoginId;
        this.userNickname = userNickname;
        this.userProfile = userProfile;
    }
}
