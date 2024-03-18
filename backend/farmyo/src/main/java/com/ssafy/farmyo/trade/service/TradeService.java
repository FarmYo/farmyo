package com.ssafy.farmyo.trade.service;

import com.ssafy.farmyo.trade.dto.TradeDto;

import java.util.List;

public interface TradeService {

    void createTrade(TradeDto tradeDto);
    List<TradeDto> getListTrade(int id);
    TradeDto getTrade(int id);
    void updateTrade(TradeDto tradeDto);

}
