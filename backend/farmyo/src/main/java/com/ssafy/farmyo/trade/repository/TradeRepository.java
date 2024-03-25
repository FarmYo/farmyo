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
import java.util.Optional;

@Repository
public interface TradeRepository extends JpaRepository<Trade, Integer> {

    @Query(value = "SELECT t.id, t.seller.nickname, t.board.boardTitle, t.tradePrice, t.tradeQuantity, t.tradeStatus FROM Trade t WHERE t.seller.id = :id AND t.tradeStatus = 3")
    List<TradeListDto> getSellerListFinish(int id);

    @Query(value = "SELECT t.id, t.seller.nickname, t.board.boardTitle, t.tradePrice, t.tradeQuantity, t.tradeStatus FROM Trade t WHERE t.seller.id = :id AND t.tradeStatus != 3")
    List<TradeListDto> getSellerListNotFinish(int id);

    @Query(value = "SELECT t.id, t.buyer.nickname, t.board.boardTitle, t.tradePrice, t.tradeQuantity, t.tradeStatus FROM Trade t WHERE t.buyer.id = :id AND t.tradeStatus = 3")
    List<TradeListDto> getBuyerListFinish(int id);

    @Query(value = "SELECT t.id, t.buyer.nickname, t.board.boardTitle, t.tradePrice, t.tradeQuantity, t.tradeStatus FROM Trade t WHERE t.buyer.id = :id AND t.tradeStatus != 3")
    List<TradeListDto> getBuyerListNotFinish(int id);

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
