package com.ssafy.farmyo.trade.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Data
public class TradeDto {

    private int id;
    private int boardId;
    private int cropId;
    private int chatId;
    private int buyer;
    private int seller;
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
