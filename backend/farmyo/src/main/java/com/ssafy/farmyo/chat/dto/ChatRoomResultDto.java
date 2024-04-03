package com.ssafy.farmyo.chat.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
public class ChatRoomResultDto {
    private List<ChatRoomListDto> resultList;
    public ChatRoomResultDto(List<ChatRoomListDto> resultList) {
        this.resultList = resultList;
    }
}
