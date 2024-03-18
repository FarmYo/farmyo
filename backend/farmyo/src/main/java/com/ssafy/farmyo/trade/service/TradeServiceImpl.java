package com.ssafy.farmyo.trade.service;

import com.ssafy.farmyo.trade.dto.TradeDto;
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

    @Override
    public void createTrade(TradeDto tradeDto) {

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
