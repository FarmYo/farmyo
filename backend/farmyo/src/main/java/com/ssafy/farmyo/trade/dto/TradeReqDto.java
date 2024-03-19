package com.ssafy.farmyo.trade.dto;

import lombok.Data;

@Data
public class TradeReqDto {

    private int tradePrice;
    private int tradeQuantity;
    private int tradeStatus;
    private String tradeShipment;
    private String tradeShipcom;
    private String tradeLocation;


}
