package com.ssafy.farmyo.crop.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class CropDetailResDto {
    private Integer id;
    private String cropName;
    private String cropImgUrl;
    private int cropStatus;
    private LocalDate cropPlantingDate;
    private LocalDate cropHarvestDate;
    private String cropCultivationSite;

    @Builder
    public CropDetailResDto(Integer id, String cropName, String cropImgUrl, int cropStatus, LocalDate cropPlantingDate, LocalDate cropHarvestDate, String cropCultivationSite) {
        this.id = id;
        this.cropName = cropName;
        this.cropImgUrl = cropImgUrl;
        this.cropStatus = cropStatus;
        this.cropPlantingDate = cropPlantingDate;
        this.cropHarvestDate = cropHarvestDate;
        this.cropCultivationSite = cropCultivationSite;
    }
}
