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
@Table(name = "trade_withdrawal")
public class TradeWithdrawal extends BaseTime {

    //식별id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    //거래매핑
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trade_id", nullable = false)
    private Trade trade;

    //유저매핑(출금자)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User seller;

    //출금자명
    @Column(name = "withdrawal_name", nullable = false)
    private String  withdrawalName;

    //출금액
    @Column(name = "withdrawal_price", nullable = false)
    private int withdrawalPrice;

    //계좌번호
    @Column(name = "withdrawal_account", nullable = false)
    private String withdrawalAccount;

    //은행명
    @Column(name = "withdrawal_bank", nullable = false)
    private String withdrawalBank;

    //예금주
    @Column(name = "withdrawal_holder", nullable = false)
    private String withdrawalHolder;

    //빌더
    @Builder
    public TradeWithdrawal(Trade trade, User seller, String withdrawalName, int withdrawalPrice,
                           String withdrawalAccount, String withdrawalBank, String withdrawalHolder) {
        this.trade = trade;
        this.seller = seller;
        this.withdrawalName = withdrawalName;
        this.withdrawalPrice = withdrawalPrice;
        this.withdrawalAccount = withdrawalAccount;
        this.withdrawalBank = withdrawalBank;
        this.withdrawalHolder = withdrawalHolder;
    }
}
