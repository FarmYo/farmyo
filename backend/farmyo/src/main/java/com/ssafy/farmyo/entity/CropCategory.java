package com.ssafy.farmyo.entity;

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
@Table(name = "crop_category")
public class CropCategory {

    //식별
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    //작물코드
    @Column(name = "category_code", nullable = false, unique = true)
    private String categoryCode;

    //작물명
    @Column(name = "category_name", nullable = false)
    private String categoryName;

    //작물과매핑
    @OneToMany(mappedBy ="cropCategory")
    private List<Crop> cropList = new ArrayList<>();

    //게시판과매핑
    @OneToMany(mappedBy = "cropCategory")
    private List<Board> boardList = new ArrayList<>();


    //빌더
    @Builder
    public CropCategory(String categoryCode, String categoryName) {
        this.categoryCode = categoryCode;
        this.categoryName = categoryName;
    }
}
