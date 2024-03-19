package com.ssafy.farmyo.entity;

import com.ssafy.farmyo.common.entity.BaseTime;
import com.ssafy.farmyo.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
public class Account{

    //예금주
    @Column(name = "account_depositor")
    private String depositor;

    //은행명
    @Column(name = "account_bank")
    private String bankName;

    //계좌번호
    @Column(name = "account_num")
    private String accountNumber;

    // 잔액
    @Column(name = "account_balance")
    private int accountBalance;

    @Builder
    public Account(String depositor, String bankName, String accountNumber, int accountBalance) {
        this.depositor = depositor;
        this.bankName = bankName;
        this.accountNumber = accountNumber;
        this.accountBalance = accountBalance;
    }

    public Account() {

    }
}
