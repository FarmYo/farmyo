package com.ssafy.farmyo.trade.dto;

import lombok.Data;
import lombok.Getter;

import java.util.List;

@Data
public class TradeListReqDto {
    List<TradeListDto> NotFinishedList;
    List<TradeListDto> FinishedList;
}
