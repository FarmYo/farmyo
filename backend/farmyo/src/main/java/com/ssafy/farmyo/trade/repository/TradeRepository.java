package com.ssafy.farmyo.trade.repository;

import com.ssafy.farmyo.entity.Trade;
import com.ssafy.farmyo.trade.dto.TradeDto;
import com.ssafy.farmyo.trade.dto.TradeListDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TradeRepository extends JpaRepository<Trade, String> {

    Trade findById(int id);

    @Query(value =
            "SELECT t.id, s.nickname, buy.nickname, t.tradeStatus, t.tradePrice, t.tradeQuantity " +
                    "FROM Trade t " +
                    "JOIN t.board b " +
                    "JOIN t.seller s " +
                    "JOIN t.buyer buy " +
                    "WHERE t.id = :id AND t.tradeStatus = :tradeStatus"
    )
    List<TradeListDto> getTradeListFinished(int id, int tradeStatus);

    // 영한's talk : jpql이랑 밑에 함수랑 겹쳐서 하나만 써야될걸??
    // getTradeListNotFinished, findByIdAndTradeStateNot
    // @NativeQuery가 뭐냐
    // where절에 t.id가 아닌 t.sellerId, t.buyerId로 나눠야함;;;
    @Query(value =
            "SELECT t.id, s.nickname, buy.nickname, t.tradeStatus, t.tradePrice, t.tradeQuantity " +
            "FROM Trade t " +
            "JOIN t.board b " +
            "JOIN t.seller s " +
            "JOIN t.buyer buy " +
            "WHERE t.id = :id AND t.tradeStatus != :tradeStatus"
    )
    List<TradeListDto> getTradeListNotFinished(int id, int tradeStatus);

}
