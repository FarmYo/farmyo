package com.ssafy.farmyo.board.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class BoardListFindByUserResDto {
    private int boardId;
    private String title;
    private LocalDateTime createdAt;
    private int boardType;
}
