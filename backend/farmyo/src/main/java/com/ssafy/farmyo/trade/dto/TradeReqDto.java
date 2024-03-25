package com.ssafy.farmyo.trade.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;

@Getter
public class TradeReqDto {


    @NotBlank
    private String sellerId;
    @NotBlank
    private String buyerId;
    @NotBlank
    private int cropId;
    @NotBlank
    private int boardId;
    // 만약 chat이 없이 board에서 만들어진 거래라면 0을 넣기
    @NotBlank
    private int chatId;
    @NotBlank
    private int tradePrice;
    @NotBlank
    private int tradeQuantity;
    @NotBlank
    private int tradeStatus;


}
