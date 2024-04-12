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
@Table(name = "farm")
public class Farm extends BaseTime {

    //마이팜식별ID
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    //농부식별ID
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = false)
    private Farmer farmer;

    //글내용
    @Column(name = "farm_content")
    private String content;

    //사진목록
    @OneToMany(mappedBy = "farm")
    private List<FarmImg> farmImgList = new ArrayList<>();


    //빌더
    @Builder
    public Farm(Farmer farmer, String content) {
        this.farmer = farmer;
        this.content = content;
    }

}
