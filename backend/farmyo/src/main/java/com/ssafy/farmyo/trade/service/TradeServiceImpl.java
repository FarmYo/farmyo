package com.ssafy.farmyo.trade.service;

import com.ssafy.farmyo.entity.Trade;
import com.ssafy.farmyo.entity.User;
import com.ssafy.farmyo.trade.dto.TradeDto;
import com.ssafy.farmyo.trade.repository.TradeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TradeServiceImpl implements TradeService {

    private final TradeRepository tradeRepository;

    @Override
    public int createTrade(User user, TradeDto tradeDto) {
//
//        Trade trade = Trade.builder()
//                .tradePrice(tradeDto.getTradePrice())
//                .tradeQuantity(tradeDto.getTradeQuantity())
//                .build();
//
//        Trade saveTrade = tradeRepository.save(trade);
//
//
//        return saveTrade.getId();
        return 0;
    }

    @Override
    public List<TradeDto> getListTrade(int id) {
        return null;
    }

    @Override
    public TradeDto getTrade(int id) {
        return null;
    }

    @Override
    public void updateTrade(TradeDto tradeDto) {

    }
}
