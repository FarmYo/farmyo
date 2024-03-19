package com.ssafy.farmyo.entity;

import com.ssafy.farmyo.common.entity.BaseTime;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "crop")
public class Crop extends BaseTime {

    //식별Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    //농부매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = false)
    private Farmer farmer;

    //작물카테고리매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private CropCategory cropCategory;

    //작물이름
    @Column(name = "crop_name", nullable = false)
    private String cropName;

    //블록체인주소
    @Column(name = "crop_blockchain", nullable = false)
    private String cropBlockchainAddress;

    //작물대표이미지
    @Column(name = "crop_img")
    private String cropImgUrl;

    //작물검사매핑
    @OneToMany(mappedBy = "crop")
    private List<CropInspect> cropInspectList = new ArrayList<>();

    //작물인증정보매핑
    @OneToMany(mappedBy = "crop")
    private List<CropCert> cropCertList = new ArrayList<>();

    //게시판매핑
    @OneToOne(mappedBy = "crop", fetch = FetchType.LAZY)
    private Board board;

    //빌더
    @Builder
    public Crop(Farmer farmer, String cropName, CropCategory cropCategory, String cropBlockchainAddress, String cropImgUrl) {

        this.farmer = farmer;
        this.cropCategory = cropCategory;
        this.cropName = cropName;
        this.cropBlockchainAddress = cropBlockchainAddress;
        this.cropImgUrl = cropImgUrl;
    }


}