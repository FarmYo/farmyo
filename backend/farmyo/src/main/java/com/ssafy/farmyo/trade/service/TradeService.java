package com.ssafy.farmyo.trade.service;

import com.ssafy.farmyo.trade.dto.TradeDto;
import com.ssafy.farmyo.trade.dto.TradeListReqDto;
import com.ssafy.farmyo.trade.dto.TradeReqDto;
import com.ssafy.farmyo.trade.dto.TradeResDto;

import java.util.Map;

public interface TradeService {

    void createTrade(TradeReqDto tradeReqDto);
    TradeListReqDto getTrades(int id);
    TradeResDto getTrade(int id);
    void updateTradeLocation(int id, String location);
    void updateTradeDeposit(int id, String depositName);
    void updateTradeDeal(int id, String tradeShipment, String tradeShipcom);
    void updateTradeFinish(int id);
    void deleteTrade(int id);

}
