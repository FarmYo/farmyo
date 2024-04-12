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
@Table(name = "trade_deposit")
public class TradeDeposit extends BaseTime {

    //식별Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    //거래매핑
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trade_id", nullable = false)
    private Trade trade;

    //유저매핑(구매자)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User buyer;


    //입금자명
    @Column(name = "deposit_name", nullable = false)
    private String depositName;

    //입금금액
    @Column(name = "deposit_price", nullable = false)
    private int depositPrice;

    //빌더
    @Builder
    public TradeDeposit(Trade trade, User buyer, String depositName, int depositPrice) {
        this.trade = trade;
        this.buyer = buyer;
        this.depositName = depositName;
        this.depositPrice = depositPrice;
    }
}
