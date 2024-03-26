package com.ssafy.farmyo.trade.service;

import com.ssafy.farmyo.trade.dto.*;

import java.util.Map;

public interface TradeService {

    void createTrade(TradeReqDto tradeReqDto);
    TradeListReqDto getTrades(int id);
    TradeResDto getTrade(int id);
    void updateTradeLocation(int id, TradeLocationDto tradeLocationDto);
    TradeLocationDto updateTradeOriginalLocation(int id, int userId);
    void updateTradeDeposit(int id, String depositName);
    void updateTradeDeal(int id, TradeShipDto tradeShipDto);
    void updateTradeFinish(int id);
    void deleteTrade(int id);

}
