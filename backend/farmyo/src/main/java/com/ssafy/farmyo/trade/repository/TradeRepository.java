package com.ssafy.farmyo.trade.repository;

import com.ssafy.farmyo.entity.Trade;
import com.ssafy.farmyo.trade.dto.TradeDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TradeRepository extends JpaRepository<Trade, String> {

//    @Query("SELECT new com.ssafy.farmyo.trade.dto.TradeDto(t.tradePrice, t.tradeQuantity) FROM Trade t WHERE id = :id")
    TradeDto findByTrade(int id);

    List<TradeDto> findAllByTrade(int userId);

}
