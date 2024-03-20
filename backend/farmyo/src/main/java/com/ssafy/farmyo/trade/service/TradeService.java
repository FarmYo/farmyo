package com.ssafy.farmyo.trade.service;

import com.ssafy.farmyo.trade.dto.TradeDto;
import com.ssafy.farmyo.trade.dto.TradeReqDto;
import com.ssafy.farmyo.trade.dto.TradeResDto;

import java.util.Map;

public interface TradeService {

    void createTrade(TradeReqDto tradeReqDto);
    Map<String, Object> getTrades(int userId);
    TradeResDto getTrade(int id);
    void updateTrade(TradeDto tradeDto);

}
