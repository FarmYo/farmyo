package com.ssafy.farmyo.trade.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
public class TradeResDto {

    private String board;
    private String crop;
    private int tradePrice;
    private int tradeQuantity;
    private String seller;
    private String buyer;
    private int tradeStatus;
    private String tradeLocation;
    private String tradeShipment;
    private String tradeShipcom;

}
