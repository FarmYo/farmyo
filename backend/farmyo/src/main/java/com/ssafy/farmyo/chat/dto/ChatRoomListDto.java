package com.ssafy.farmyo.chat.dto;

import com.ssafy.farmyo.entity.Message;
import com.ssafy.farmyo.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ChatRoomListDto {

    private int chatId;
    private String userNickname;
    private String userProfile;
    private String recentMessage;
    private LocalDateTime recentMessageTime;

    public ChatRoomListDto(int chatId, String userNickname, String userProfile, String recentMessage, LocalDateTime recentMessageTime) {
        this.chatId = chatId;
        this.userNickname = userNickname;
        this.userProfile = userProfile;
        this.recentMessage = recentMessage;
        this.recentMessageTime = recentMessageTime;
    }
}
