package com.ssafy.farmyo.crop.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class HarvestCropListResDto {
    private int id;
    private String name;
    private LocalDate harvestDate;
}
