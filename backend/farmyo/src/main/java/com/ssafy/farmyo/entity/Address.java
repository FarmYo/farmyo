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
@Table(name = "address")
public class Address extends BaseTime {

    //식별아이디
    @Id // not null, unique 자동적용
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    //유저연결
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    //우편번호
    @Column(name = "address_code", nullable = false)
    private String addressCode;

    //법정주소
    @Column(name = "address_legal", nullable = false)
    private String addressLegal;

    //상세주소
    @Column(name = "address_detail", nullable = false)
    private String addressDetail;

    //빌더
    @Builder
    public Address(User user, String addressCode, String addressLegal, String addressDetail) {
        this.user = user;
        this.addressCode = addressCode;
        this.addressLegal = addressLegal;
        this.addressDetail = addressDetail;
    }

    public void updateAll(String addressCode, String addressLegal, String addressDetail){
        this.addressCode = addressCode;
        this.addressLegal = addressLegal;
        this.addressDetail = addressDetail;
    }
}
