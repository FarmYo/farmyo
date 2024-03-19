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
@Table(name = "wallet")
public class Wallet extends BaseTime {
    //식별 Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    //유저와매핑
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    //지갑 주소
    @Column(name = "wallet_address", nullable = false, unique = true)
    private String walletAddress;

    //개인 키
    @Column(name = "private_key", nullable = false, unique = true)
    private String walletPrivateKey;

    //빌더
    @Builder
    public Wallet(User user, String walletAddress, String walletPrivateKey) {
        this.user = user;
        this.walletAddress = walletAddress;
        this.walletPrivateKey = walletPrivateKey;
    }
}
