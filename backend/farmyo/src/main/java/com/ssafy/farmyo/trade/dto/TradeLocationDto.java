package com.ssafy.farmyo.trade.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TradeLocationDto {

    private String location;
    private String locationDetail;

}
