package com.ssafy.farmyo.crop.dto;

import com.ssafy.farmyo.entity.Crop;
import com.ssafy.farmyo.entity.CropCategory;
import com.ssafy.farmyo.entity.Farmer;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AddCropReqDto {

    //유저는 어떻게 받을지 모르겠음
    private Integer farmer_id;

    @NotEmpty(message = "카테고리 골라주세요")
    private Integer cropCategoryId;

    @NotBlank(message = "작물이름 적어주세요")
    private String cropName;

    private String cropBlockchainAddress;
    private String cropImgUrl;

    @Builder
    public AddCropReqDto(Integer farmer_id, Integer cropCategoryId, String cropName, String cropBlockchainAddress, String cropImgUrl) {
        this.farmer_id = farmer_id;
        this.cropCategoryId = cropCategoryId;
        this.cropName = cropName;
        this.cropBlockchainAddress = cropBlockchainAddress;
        this.cropImgUrl = cropImgUrl;
    }

}
