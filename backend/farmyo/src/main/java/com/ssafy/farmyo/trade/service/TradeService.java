package com.ssafy.farmyo.trade.service;

import com.ssafy.farmyo.entity.Board;
import com.ssafy.farmyo.entity.Chat;
import com.ssafy.farmyo.entity.User;
import com.ssafy.farmyo.trade.dto.TradeDto;
import com.ssafy.farmyo.trade.dto.TradeReqDto;

import java.util.List;
import java.util.Map;
import java.util.Objects;

public interface TradeService {

    int createTrade(TradeReqDto tradeReqDto);
    Map<String, Object> getTrades(int userId);
    TradeDto getTrade(int id);
    void updateTrade(TradeDto tradeDto);

}
