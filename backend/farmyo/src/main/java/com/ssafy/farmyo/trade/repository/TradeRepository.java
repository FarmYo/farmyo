package com.ssafy.farmyo.trade.repository;

import com.ssafy.farmyo.entity.Trade;
import com.ssafy.farmyo.entity.User;
import com.ssafy.farmyo.trade.dto.TradeDto;
import com.ssafy.farmyo.trade.dto.TradeListDto;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface TradeRepository extends JpaRepository<Trade, Integer> {

//    @Query(value = "SELECT t FROM Trade t WHERE t.buyer.id = :id AND t.tradeStatus = :tradeStatus ORDER BY t.updatedAt DESC ")
//    List<Trade> findAllByBuyerAndTradeStatus(int id, int tradeStatus);
//
//    @Query(value = "SELECT t FROM Trade t WHERE t.buyer.id = :id AND t.tradeStatus != :tradeStatus ORDER BY t.updatedAt DESC ")
//    List<Trade> findAllByBuyerAndTradeStatusNot(int id, int tradeStatus);
//
//    @Query(value = "SELECT t FROM Trade t WHERE t.seller.id = :id AND t.tradeStatus = :tradeStatus ORDER BY t.updatedAt DESC ")
//    List<Trade> findAllBySellerAndTradeStatus(int id, int tradeStatus);
//
//    @Query(value = "SELECT t FROM Trade t WHERE t.seller.id = :id AND t.tradeStatus != :tradeStatus ORDER BY t.updatedAt DESC ")
//    List<Trade> findAllBySellerAndTradeStatusNot(int id, int tradeStatus);

    @Query("SELECT t FROM Trade t WHERE t.buyer.id = :id AND t.tradeStatus = :tradeStatus ORDER BY t.updatedAt DESC ")
    Page<Trade> findAllByBuyerAndTradeStatus(int id, int tradeStatus, Pageable pageable);

    @Query("SELECT t FROM Trade t WHERE t.buyer.id = :id AND t.tradeStatus != :tradeStatus ORDER BY t.updatedAt DESC ")
    Page<Trade> findAllByBuyerAndTradeStatusNot(int id, int tradeStatus, Pageable pageable);

    @Query("SELECT t FROM Trade t WHERE t.seller.id = :id AND t.tradeStatus = :tradeStatus ORDER BY t.updatedAt DESC ")
    Page<Trade> findAllBySellerAndTradeStatus(int id, int tradeStatus, Pageable pageable);

    @Query("SELECT t FROM Trade t WHERE t.seller.id = :id AND t.tradeStatus != :tradeStatus ORDER BY t.updatedAt DESC ")
    Page<Trade> findAllBySellerAndTradeStatusNot(int id, int tradeStatus, Pageable pageable);


    @Transactional
    @Modifying
    @Query("UPDATE Trade t SET t.tradeStatus = :status WHERE t.id = :id")
    void updateStatus(int id, int status);

    @Transactional
    @Modifying
    @Query("UPDATE Trade t SET t.tradeLocation = :location, t.tradeLocationDetail = :locationDetail WHERE t.id = :id")
    void updateLocation(int id, String location, String locationDetail);

    @Transactional
    @Modifying
    @Query("UPDATE Trade t SET t.tradeShipment = :tradeShipment, t.tradeShipcom = :tradeShipcom WHERE t.id = :id")
    void updateShip(int id, String tradeShipment, String tradeShipcom);
}
