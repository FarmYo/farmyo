package com.ssafy.farmyo.trade.repository;

import com.ssafy.farmyo.entity.Trade;
import com.ssafy.farmyo.trade.dto.TradeDto;
import com.ssafy.farmyo.trade.dto.TradeListDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface TradeRepository extends JpaRepository<Trade, Integer> {

    // 판매자의 아이디를 통해 거래완료된 거래 목록 가져오기
    @Query(value =
            "SELECT t.id, s.nickname, buy.nickname, t.tradeStatus, t.tradePrice, t.tradeQuantity " +
                    "FROM Trade t " +
                    "JOIN t.board b " +
                    "JOIN t.seller s " +
                    "JOIN t.buyer buy " +
                    "WHERE t.seller = :id AND t.tradeStatus = 3"
    )
    List<TradeListDto> getSellerTradeListFinished(int id);


    // 판매자의 아이디를 통해 거래완료가 안된 거래 목록 가져오기
    @Query(value =
            "SELECT t.id, s.nickname, buy.nickname, t.tradeStatus, t.tradePrice, t.tradeQuantity " +
            "FROM Trade t " +
            "JOIN t.board b " +
            "JOIN t.seller s " +
            "JOIN t.buyer buy " +
            "WHERE t.seller = :id AND t.tradeStatus != 3"
    )
    List<TradeListDto> getSellerTradeListNotFinished(int id);

    // 구매자의 아이디를 통해 거래완료된 거래 목록 가져오기
    @Query(value =
            "SELECT t.id, s.nickname, buy.nickname, t.tradeStatus, t.tradePrice, t.tradeQuantity " +
                    "FROM Trade t " +
                    "JOIN t.board b " +
                    "JOIN t.seller s " +
                    "JOIN t.buyer buy " +
                    "WHERE t.buyer = :id AND t.tradeStatus = 3"
    )
    List<TradeListDto> getBuyerTradeListFinished(int id);


    // 구매자의 아이디를 통해 거래완료가 안된 거래 목록 가져오기
    @Query(value =
            "SELECT t.id, s.nickname, buy.nickname, t.tradeStatus, t.tradePrice, t.tradeQuantity " +
                    "FROM Trade t " +
                    "JOIN t.board b " +
                    "JOIN t.seller s " +
                    "JOIN t.buyer buy " +
                    "WHERE t.buyer = :id AND t.tradeStatus != 3"
    )
    List<TradeListDto> getBuyerTradeListNotFinished(int id);

    @Transactional
    @Modifying
    @Query("UPDATE Trade t SET t.tradeStatus = :status WHERE t.id = :id")
    void updateStatus(int id, int status);

    @Transactional
    @Modifying
    @Query("UPDATE Trade t SET t.tradeLocation = :location WHERE t.id = :id")
    void updateLocation(int id, String location);

    @Transactional
    @Modifying
    @Query("UPDATE Trade t SET t.tradeShipment = :tradeShipment, t.tradeShipcom = :tradeShipcom WHERE t.id = :id")
    void updateShip(int id, String tradeShipment, String tradeShipcom);
}
