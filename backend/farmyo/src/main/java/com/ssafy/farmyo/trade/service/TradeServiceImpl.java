package com.ssafy.farmyo.trade.service;

import com.ssafy.farmyo.entity.Board;
import com.ssafy.farmyo.entity.Chat;
import com.ssafy.farmyo.entity.Trade;
import com.ssafy.farmyo.entity.User;
import com.ssafy.farmyo.trade.dto.TradeDto;
import com.ssafy.farmyo.trade.repository.TradeRepository;
import com.ssafy.farmyo.user.dto.UserDto;
import com.ssafy.farmyo.user.repository.UserRepository;
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
    private final UserRepository userRepository;

    @Override
    public int createTrade(int sellerId, int buyerId, int boardId, int chatId, TradeDto tradeDto) {

        // trade 생성
        Trade trade = Trade.builder()
                .tradePrice(tradeDto.getTradePrice())
                .tradeQuantity(tradeDto.getTradeQuantity())
                .build();


        // seller 가져오기
        User seller = userRepository.findById(sellerId);

        // buyer 가져오기

        // boardId 가져오기

        // chatId 가져오기


        Trade saveTrade = tradeRepository.save(trade);

        return 0;
    }


    @Override
    public List<TradeDto> getTradeList(int userId) {

        return tradeRepository.findAllByTrade(userId);
    }

    @Override
    public TradeDto getTrade(int id) {

        return tradeRepository.findByTrade(id);
    }

    @Override
    public void updateTrade(TradeDto tradeDto) {

    }
}
