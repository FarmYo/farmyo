package com.ssafy.farmyo.crop.dto;

import com.ssafy.farmyo.entity.Crop;
import com.ssafy.farmyo.entity.CropCategory;
import com.ssafy.farmyo.entity.Farmer;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class AddCropReqDto {


    @NotEmpty(message = "카테고리 골라주세요")
    private Integer cropCategoryId;

    @NotBlank(message = "작물이름 적어주세요")
    private String cropName;

    @NotBlank(message = "재배지를 적어주세요")
    private String cultivation;

    @NotEmpty(message = "심은 날을 적어쥇요")
    private LocalDate plantingDate;

    @Builder
    public AddCropReqDto(Integer cropCategoryId, String cropName, String cultivation, LocalDate plantingDate) {
        this.cropCategoryId = cropCategoryId;
        this.cropName = cropName;
        this.cultivation = cultivation;
        this.plantingDate = plantingDate;
    }

}
