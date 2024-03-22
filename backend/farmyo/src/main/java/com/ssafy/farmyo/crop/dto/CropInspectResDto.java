package com.ssafy.farmyo.crop.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class CropInspectResDto {

    private int id;
    private String inspectName;
    private String inspectNumber;
    private String inspectResult;
    private String inspectCorp;
    private LocalDate inspectDate;

    @Builder
    public CropInspectResDto(int id, String inspectName, String inspectNumber, String inspectResult, String inspectCorp, LocalDate inspectDate) {
        this.id=id;
        this.inspectName = inspectName;
        this.inspectNumber = inspectNumber;
        this.inspectResult = inspectResult;
        this.inspectCorp = inspectCorp;
        this.inspectDate = inspectDate;
    }
}
