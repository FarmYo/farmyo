package com.ssafy.farmyo.chat.dto;

import com.ssafy.farmyo.entity.Chat;
import com.ssafy.farmyo.entity.User;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ChatDto {

    private int id;
    private int sellerId;
    private int buyerId;

    @Builder
    public ChatDto(int id, int buyerId, int sellerId){
        this.id = id;
        this.buyerId = buyerId;
        this.sellerId = sellerId;
    }
}
