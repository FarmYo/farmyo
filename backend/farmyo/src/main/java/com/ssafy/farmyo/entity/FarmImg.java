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
@Table(name = "farm_img")
public class FarmImg extends BaseTime {

    //마이팜사진 식별 Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    //마이팜과 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farm_id", nullable = false)
    private Farm farm;

    //이미지 순서
    @Column(name = "img_order", nullable = false)
    private int imgOrder;

    //이미지 경로
    @Column(name = "img_url", nullable = false)
    private String imgUrl;

    //빌더
    @Builder
    public FarmImg(Farm farm, int imgOrder, String imgUrl) {
        this.farm = farm;
        this.imgOrder = imgOrder;
        this.imgUrl = imgUrl;
    }


}
