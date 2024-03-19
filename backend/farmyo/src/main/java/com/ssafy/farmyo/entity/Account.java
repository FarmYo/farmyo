package com.ssafy.farmyo.entity;

import com.ssafy.farmyo.common.entity.BaseTime;
import com.ssafy.farmyo.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "account")
public class Account extends BaseTime {
    //식별Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    //유저연결
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_Id", nullable = false)
    private User user;

    //예금주
    @Column(name = "account_depositor")
    private String depositor;

    //은행명
    @Column(name = "account_bank")
    private String bankName;

    //계좌번호
    @Column(name = "account_num")
    private String accountNumber;

    //빌더패턴
    @Builder
    public Account(User user, String depositor, String bankName, String accountNumber) {
        this.user = user;
        this.depositor = depositor;
        this.bankName = bankName;
        this.accountNumber = accountNumber;
    }

}
