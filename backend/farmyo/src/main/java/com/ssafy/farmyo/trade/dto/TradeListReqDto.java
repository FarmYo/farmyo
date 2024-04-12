package com.ssafy.farmyo.trade.dto;

import com.ssafy.farmyo.entity.Trade;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class TradeListReqDto {
    List<TradeListDto> NotFinishedList;
    List<TradeListDto> FinishedList;
}
