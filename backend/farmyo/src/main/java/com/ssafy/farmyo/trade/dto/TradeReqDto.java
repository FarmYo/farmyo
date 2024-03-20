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
    @NotBlank
    private int chat;
    @NotBlank
    private int tradePrice;
    @NotBlank
    private int tradeQuantity;
    @NotBlank
    private int tradeStatus;
    private String tradeShipment;
    private String tradeShipcom;
    private String tradeLocation;


}
