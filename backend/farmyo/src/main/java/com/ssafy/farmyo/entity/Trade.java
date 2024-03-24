package com.ssafy.farmyo.entity;

import com.ssafy.farmyo.common.entity.BaseTime;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "trade")
public class Trade extends BaseTime {

    //식별Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    //게시판식별Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", nullable = false)
    private Board board;

    //작물식별Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id", nullable = false)
    private Crop crop;

    //채팅방식별Id
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_id")
    private Chat chat;

    //구매자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trade_buyer", nullable = false)
    private User buyer;

    //판매자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trade_seller", nullable = false)
    private User seller;

    //거래가격
    @Column(name = "trade_price", nullable = false)
    private int tradePrice;

    //거래수량
    @Column(name = "trade_quantity", nullable = false)
    private int tradeQuantity;

    //거래상태
    @Column(name = "trade_status", nullable = false)
    private int tradeStatus;

    //운송장번호
    @Column(name = "trade_shipment")
    private String tradeShipment;

    //택배사
    @Column(name = "trade_shipcom")
    private String tradeShipcom;

    //배송지
    @Column(name = "trade_location")
    private String tradeLocation;

    //블록체인주소
    @Column(name = "trade_blockchain")
    private String tradeBlockchain;

    //입금매핑
    @OneToOne(mappedBy = "trade", fetch = FetchType.LAZY)
    private TradeDeposit tradeDeposit;

    //출금매핑
    @OneToOne(mappedBy = "trade", fetch = FetchType.LAZY)
    private TradeWithdrawal tradeWithdrawal;


    //빌더형식
    @Builder
    public Trade(int id, Board board, Crop crop, Chat chat, User buyer, User seller,
                 int tradePrice, int tradeQuantity, int tradeStatus,
                 String tradeShipment, String tradeShipcom, String tradeLocation, String tradeBlockchain) {
        this.id = id;
        this.board = board;
        this.crop = crop;
        this.chat = chat;
        this.buyer = buyer;
        this.seller = seller;
        this.tradePrice = tradePrice;
        this.tradeQuantity = tradeQuantity;
        this.tradeStatus = tradeStatus;
        this.tradeShipment = tradeShipment;
        this.tradeShipcom = tradeShipcom;
        this.tradeLocation = tradeLocation;
        this.tradeBlockchain = tradeBlockchain;
    }


}
