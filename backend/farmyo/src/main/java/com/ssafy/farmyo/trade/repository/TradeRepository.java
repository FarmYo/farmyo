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

    // 판매자의 아이디를 통해 거래완료된 거래 목록 가져오기
    @Query(value =
            "SELECT t.id, s.nickname, buy.nickname, t.tradeStatus, t.tradePrice, t.tradeQuantity " +
                    "FROM Trade t " +
                    "JOIN t.board b " +
                    "JOIN t.seller s " +
                    "JOIN t.buyer buy " +
                    "WHERE t.seller = :id AND t.tradeStatus = :tradeStatus"
    )
    List<TradeListDto> getSellerTradeListFinished(int id, int tradeStatus);


    // 판매자의 아이디를 통해 거래완료가 안된 거래 목록 가져오기
    @Query(value =
            "SELECT t.id, s.nickname, buy.nickname, t.tradeStatus, t.tradePrice, t.tradeQuantity " +
            "FROM Trade t " +
            "JOIN t.board b " +
            "JOIN t.seller s " +
            "JOIN t.buyer buy " +
            "WHERE t.seller = :id AND t.tradeStatus != :tradeStatus"
    )
    List<TradeListDto> getSellerTradeListNotFinished(int id, int tradeStatus);

    // 구매자의 아이디를 통해 거래완료된 거래 목록 가져오기
    @Query(value =
            "SELECT t.id, s.nickname, buy.nickname, t.tradeStatus, t.tradePrice, t.tradeQuantity " +
                    "FROM Trade t " +
                    "JOIN t.board b " +
                    "JOIN t.seller s " +
                    "JOIN t.buyer buy " +
                    "WHERE t.buyer = :id AND t.tradeStatus = :tradeStatus"
    )
    List<TradeListDto> getBuyerTradeListFinished(int id, int tradeStatus);


    // 구매자의 아이디를 통해 거래완료가 안된 거래 목록 가져오기
    @Query(value =
            "SELECT t.id, s.nickname, buy.nickname, t.tradeStatus, t.tradePrice, t.tradeQuantity " +
                    "FROM Trade t " +
                    "JOIN t.board b " +
                    "JOIN t.seller s " +
                    "JOIN t.buyer buy " +
                    "WHERE t.buyer = :id AND t.tradeStatus != :tradeStatus"
    )
    List<TradeListDto> getBuyerTradeListNotFinished(int id, int tradeStatus);

}
