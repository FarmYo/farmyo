package com.ssafy.farmyo.trade.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Getter
@Builder
public class TradeListDto {

    private int id;
    private String seller;
    private String buyer;
    private String boardTitle;
    private int tradeStatus;
    private int tradePrice;
    private int tradeQuantity;

}
