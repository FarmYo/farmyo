package com.ssafy.farmyo.trade.dto;

import lombok.Data;

@Data
public class TradeReqDto {

    private int seller;
    private int buyer;
    private int crop;
    private int board;
    private int chat;
    private int tradePrice;
    private int tradeQuantity;
    private int tradeStatus;
    private String tradeShipment;
    private String tradeShipcom;
    private String tradeLocation;


}
