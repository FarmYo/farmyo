package com.ssafy.farmyo.trade.dto;

import lombok.Data;

@Data
public class TradeListDto {

    private int id;
    private String board;
    private String buyer;
    private String seller;
    private int tradeStatus;
    private int tradePrice;
    private int tradeQuantity;

}
