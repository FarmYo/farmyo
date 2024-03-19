package com.ssafy.farmyo.trade.service;

import com.ssafy.farmyo.entity.Board;
import com.ssafy.farmyo.entity.Chat;
import com.ssafy.farmyo.entity.User;
import com.ssafy.farmyo.trade.dto.TradeDto;

import java.util.List;

public interface TradeService {

    int createTrade(int sellerId, int buyerId, int boardId, int chatId, TradeDto tradeDto);
    List<TradeDto> getTradeList(int userId);
    TradeDto getTrade(int id);
    void updateTrade(TradeDto tradeDto);

}
