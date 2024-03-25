package com.ssafy.farmyo.trade.dto;

import lombok.Data;

@Data
public class TradeListDto {

    private int id;
    private String seller;
    private String buyer;
    private String board;
    private int tradeStatus;
    private int tradePrice;
    private int tradeQuantity;

}
