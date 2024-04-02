package com.ssafy.farmyo.chat.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
public class ChatRoomResultDto {
    private List<Integer> unreadCountList;
    private List<ChatRoomListDto> resultList;

    public ChatRoomResultDto(List<Integer> unreadCountList, List<ChatRoomListDto> resultList) {
        this.unreadCountList = unreadCountList;
        this.resultList = resultList;
    }
}
