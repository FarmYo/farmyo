package com.ssafy.farmyo.trade.dto;

import lombok.Data;

@Data
public class TradeResDto {

    private int id;
    private int chatId;
    private String crop;
    private String board;
    private int tradePrice;
    private int tradeQuantity;
    private String seller;
    private String buyer;
    private int tradeStatus;
    private String tradeShipment;
    private String tradeShipcom;
    private String tradeLocation;
    private String tradeBlockchain;

}
