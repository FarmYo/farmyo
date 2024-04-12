package com.ssafy.farmyo.chat.dto;

import lombok.Data;

@Data
public class ChatRoomDto {

    private int boardId;
    private int buyerId;
    private int sellerId;

    public ChatRoomDto(int boardId, int buyerId, int sellerId) {
        this.boardId = boardId;
        this.buyerId = buyerId;
        this.sellerId = sellerId;
    }
}
