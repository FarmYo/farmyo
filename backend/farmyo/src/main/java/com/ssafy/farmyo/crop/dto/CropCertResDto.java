package com.ssafy.farmyo.crop.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class CropCertResDto {
    private int id;
    private String certName;
    private String certNumber;
    private String certCorp;
    private LocalDate certDate;

    @Builder
    CropCertResDto(int id, String certName, String certNumber, String certCorp, LocalDate certDate) {
        this.id = id;
        this.certName = certName;
        this.certNumber = certNumber;
        this.certCorp = certCorp;
        this.certDate = certDate;
    }
}
