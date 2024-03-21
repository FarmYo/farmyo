package com.ssafy.farmyo.crop.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class CropListDto {

    private int id;
    private int cropStatus;
    private String cropName;
    private String cropImgUrl;
    private LocalDate cropHarvestDate;

    @Builder
    public CropListDto(int id, int cropStatus, String cropName, String cropImgUrl, LocalDate cropHarvestDate){
        this.id = id;
        this.cropStatus = cropStatus;
        this.cropName = cropName;
        this.cropImgUrl = cropImgUrl;
        this.cropHarvestDate = cropHarvestDate;
    }


}
