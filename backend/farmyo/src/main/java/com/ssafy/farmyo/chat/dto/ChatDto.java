package com.ssafy.farmyo.chat.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ChatDto {

    private int id;

    @Builder
    public ChatDto(int id){
        this.id = id;
    }
}
