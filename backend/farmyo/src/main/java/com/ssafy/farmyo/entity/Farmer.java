package com.ssafy.farmyo.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "farmer")
public class Farmer extends User{
    //사업자 등록번호
    @Column(name = "farmer_license")
    String farmerLicense;

    //즐겨찾기과 관계매핑 농부는 필요 없을 것 같은데 일단 만들어둠
    @OneToMany(mappedBy = "farmer")
    private List<Favorite> favoritesAsFarmer = new ArrayList<>();

    //마이팜과 관계매핑
    @OneToMany(mappedBy = "farmer")
    private List<Farm> farms = new ArrayList<>();


    //작물과 관계패밍
    @OneToMany(mappedBy = "farmer")
    private List<Crop> crops = new ArrayList<>();


    //빌더패턴
//    @Builder
//    public Farmer(LocalDateTime deletedAt, UserStatus status, String loginId, String password, String telephone,
//                  String nickname, String email, String profile, String comment, String farmerLicense) {
//        super(deletedAt, status, loginId, password, telephone, nickname, email, profile, comment);
//        this.farmerLicense = farmerLicense;
//    }

}
