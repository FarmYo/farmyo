package com.ssafy.farmyo.entity;

import com.ssafy.farmyo.common.entity.BaseTime;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "crop_inspect")
public class CropInspect extends BaseTime {

    //식별자
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    //작물매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id", nullable = false)
    private Crop crop;

    //검사명
    @Column(name = "inspect_name", nullable = false)
    private String inspectName;

    //검사번호
    @Column(name = "inspect_num", nullable = false)
    private Integer inspectNumber;

    //검사결과
    @Column(name = "inspect_res", nullable = false)
    private String inspectResult;

    //검사기관명
    @Column(name = "inspect_corp", nullable = false)
    private String inspectCorp;

    //검사일시
    @Column(name = "inspect_date", nullable = false)
    private LocalDate inspectDate;

    //빌더
    @Builder
    public CropInspect(Crop crop, String inspectName, Integer inspectNumber, String inspectResult, String inspectCorp, LocalDate inspectDate) {
        this.crop = crop;
        this.inspectName = inspectName;
        this.inspectNumber = inspectNumber;
        this.inspectResult = inspectResult;
        this.inspectCorp = inspectCorp;
        this.inspectDate = inspectDate;
    }

}
