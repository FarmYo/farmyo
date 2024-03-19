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
@Table(name = "crop_cert")
public class CropCert extends BaseTime {
    //식별자
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    //작물매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id", nullable = false)
    private Crop crop;

    //인증/표시명
    @Column(name = "cert_name", nullable = false)
    private String certName;

    //인증/표시번호
    @Column(name = "cert_num", nullable = false)
    private Integer certNumber;

    //인증기관명
    @Column(name = "cert_corp", nullable = false)
    private String certCorp;

    //인증일시
    @Column(name = "cert_date", nullable = false)
    private LocalDate certDate;

    //빌더
    @Builder
    public CropCert(Crop crop, String certName, Integer certNumber, String certCorp, LocalDate certDate) {
        this.crop = crop;
        this.certName = certName;
        this.certNumber = certNumber;
        this.certCorp = certCorp;
        this.certDate = certDate;
    }

}
