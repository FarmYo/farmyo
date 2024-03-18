package com.ssafy.farmyo.trade.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TradeDto {

    private int id;
    private int boardId;
    private int cropId;
    private int chatId;
    private int tradeBuyer;
    private int tradeSeller;
    private String createdAt;
    private String updatedAt;
    private int tradePrice;
    private int tradeQuantity;
    private int tradeStatus;
    private String tradeShipment;
    private String tradeShipcom;
    private String tradeLocation;
    private String tradeBlockchain;

}
