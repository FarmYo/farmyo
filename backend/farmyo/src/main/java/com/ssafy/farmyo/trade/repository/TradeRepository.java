package com.ssafy.farmyo.trade.repository;

import com.ssafy.farmyo.entity.Trade;
import com.ssafy.farmyo.trade.dto.TradeDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TradeRepository extends JpaRepository<Trade, String> {

    TradeDto findByTrade(int id);
    List<TradeDto> findByIdAndTradeStatus(int id, int tradeState);

    // 영한's talk : jpql이랑 밑에 함수랑 겹쳐서 하나만 써야될걸??
    // getTradeListNotFinished, findByIdAndTradeStateNot
    // @NativeQuery가 뭐냐
    @Query(value = "SELECT t FROM Trade t WHERE t.id = :id AND t.tradeStatus != :tradeState")
    List<TradeDto> getTradeListNotFinished(int id, int tradeState);

}
