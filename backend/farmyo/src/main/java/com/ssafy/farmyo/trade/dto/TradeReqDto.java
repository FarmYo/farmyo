package com.ssafy.farmyo.trade.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;

@Getter
public class TradeReqDto {

    @NotBlank
    private int seller;
    @NotBlank
    private int buyer;
    @NotBlank
    private int crop;
    @NotBlank
    private int board;
    // 만약 chat이 없이 board에서 만들어진 거래라면 0을 넣기
    @NotBlank
    private int chat;
    @NotBlank
    private int tradePrice;
    @NotBlank
    private int tradeQuantity;
    @NotBlank
    private int tradeStatus;


}
