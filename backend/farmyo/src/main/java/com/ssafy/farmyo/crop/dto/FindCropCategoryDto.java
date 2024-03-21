package com.ssafy.farmyo.crop.dto;

import com.ssafy.farmyo.entity.CropCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FindCropCategoryDto {

    private Integer id;

    private String categoryCode;

    private String categoryName;

    @Builder
    public FindCropCategoryDto(Integer id, String categoryCode, String categoryName) {
        this.id = id;
        this.categoryCode = categoryCode;
        this.categoryName = categoryName;
    }

    public static FindCropCategoryDto toDto(CropCategory cropCategory) {
        return FindCropCategoryDto.builder()
                .id(cropCategory.getId())
                .categoryCode(cropCategory.getCategoryCode())
                .categoryName(cropCategory.getCategoryName())
                .build();
    }


}
