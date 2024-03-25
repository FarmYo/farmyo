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
            "SELECT t.id, s.nickname as seller, buy.nickname as buyer, b.boardTitle as board, t.tradeStatus, t.tradePrice, t.tradeQuantity "+
                    "FROM Trade t " +
                    "JOIN t.board b " +
                    "JOIN t.seller s " +
                    "JOIN t.buyer buy " +
                    "WHERE t.seller.loginId = :loginId AND t.tradeStatus = 3"
    )
    List<TradeListDto> getSellerTradeListFinished(String loginId);


    // 판매자의 아이디를 통해 거래완료가 안된 거래 목록 가져오기
    @Query(value =
            "SELECT t.id, s.nickname as seller, buy.nickname as buyer, b.boardTitle as board, t.tradeStatus, t.tradePrice, t.tradeQuantity " +
            "FROM Trade t " +
            "JOIN t.board b " +
            "JOIN t.seller s " +
            "JOIN t.buyer buy " +
            "WHERE t.seller.loginId = :loginId AND t.tradeStatus != 3"
    )
    List<TradeListDto> getSellerTradeListNotFinished(String loginId);

    // 구매자의 아이디를 통해 거래완료된 거래 목록 가져오기
    @Query(value =
            "SELECT t.id, s.nickname as seller, buy.nickname as buyer, b.boardTitle as board, t.tradeStatus, t.tradePrice, t.tradeQuantity " +
                    "FROM Trade t " +
                    "JOIN t.board b " +
                    "JOIN t.seller s " +
                    "JOIN t.buyer buy " +
                    "WHERE t.buyer.loginId = :loginId AND t.tradeStatus = 3"
    )
    List<TradeListDto> getBuyerTradeListFinished(String loginId);


    // 구매자의 아이디를 통해 거래완료가 안된 거래 목록 가져오기
    @Query(value =
            "SELECT t.id, s.nickname as seller, buy.nickname as buyer, b.boardTitle as board, t.tradeStatus, t.tradePrice, t.tradeQuantity " +
                    "FROM Trade t " +
                    "JOIN t.board b " +
                    "JOIN t.seller s " +
                    "JOIN t.buyer buy " +
                    "WHERE t.buyer.loginId = :loginId AND t.tradeStatus != 3"
    )
    List<TradeListDto> getBuyerTradeListNotFinished(String loginId);

//// 판매자의 아이디를 통해 거래완료된 거래 목록 가져오기
//@Query(nativeQuery = true, value =
//        "SELECT t.id, s.user_nickname as seller, buy.user_nickname as buyer, b.board_title as board, t.trade_status, t.trade_price, t.trade_quantity \n" +
//                "FROM trade t \n" +
//                "JOIN board b \n" +
//                "ON t.board_id = b.id \n" +
//                "JOIN user s \n" +
//                "ON t.trade_seller = s.id \n" +
//                "JOIN user buy \n" +
//                "ON t.trade_buyer = buy.id \n" +
//                "WHERE s.user_loginid = :loginId AND t.trade_status = 3;"
//)
//List<TradeListDto> getSellerTradeListFinished(String loginId);
//
//
//    // 판매자의 아이디를 통해 거래완료가 안된 거래 목록 가져오기
//    @Query(nativeQuery = true, value =
//            "SELECT t.id, s.user_nickname as seller, buy.user_nickname as buyer, b.board_title as board, t.trade_status, t.trade_price, t.trade_quantity \n" +
//                    "FROM trade t \n" +
//                    "JOIN board b \n" +
//                    "ON t.board_id = b.id \n" +
//                    "JOIN user s \n" +
//                    "ON t.trade_seller = s.id \n" +
//                    "JOIN user buy \n" +
//                    "ON t.trade_buyer = buy.id \n" +
//                    "WHERE s.user_loginid = :loginId AND t.trade_status != 3;"
//    )
//    List<TradeListDto> getSellerTradeListNotFinished(String loginId);
//
//    // 구매자의 아이디를 통해 거래완료된 거래 목록 가져오기
//    @Query(nativeQuery = true, value =
//            "SELECT t.id, s.user_nickname as seller, buy.user_nickname as buyer, b.board_title as board, t.trade_status, t.trade_price, t.trade_quantity \n" +
//                    "FROM trade t \n" +
//                    "JOIN board b \n" +
//                    "ON t.board_id = b.id \n" +
//                    "JOIN user s \n" +
//                    "ON t.trade_seller = s.id \n" +
//                    "JOIN user buy \n" +
//                    "ON t.trade_buyer = buy.id \n" +
//                    "WHERE buy.user_loginid = :loginId AND t.trade_status = 3;"
//    )
//    List<TradeListDto> getBuyerTradeListFinished(String loginId);
//
//
//    // 구매자의 아이디를 통해 거래완료가 안된 거래 목록 가져오기
//    @Query(nativeQuery = true, value =
//            "SELECT t.id, s.user_nickname as seller, buy.user_nickname as buyer, b.board_title as board, t.trade_status, t.trade_price, t.trade_quantity \n" +
//                    "FROM trade t \n" +
//                    "JOIN board b \n" +
//                    "ON t.board_id = b.id \n" +
//                    "JOIN user s \n" +
//                    "ON t.trade_seller = s.id \n" +
//                    "JOIN user buy \n" +
//                    "ON t.trade_buyer = buy.id \n" +
//                    "WHERE buy.user_loginid = :loginId AND t.trade_status != 3;"
//    )
//    List<TradeListDto> getBuyerTradeListNotFinished(String loginId);

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
