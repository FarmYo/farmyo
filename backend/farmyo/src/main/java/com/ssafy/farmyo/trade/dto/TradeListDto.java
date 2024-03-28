package com.ssafy.farmyo.trade.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Getter
@Builder
public class TradeListDto {

    private String cropImg;
    private int id;
    private String nickname;
    private String boardTitle;
    private int tradePrice;
    private int tradeQuantity;
    private int tradeStatus;

}
