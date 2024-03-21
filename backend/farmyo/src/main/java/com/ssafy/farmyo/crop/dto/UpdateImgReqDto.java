package com.ssafy.farmyo.crop.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdateImgReqDto {
    private String cropImgUrl;

    @Builder
    public UpdateImgReqDto(String cropImgUrl) {
        this.cropImgUrl = cropImgUrl;
    }
}
