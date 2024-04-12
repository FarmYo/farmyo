package com.ssafy.farmyo.crop.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Getter
@NoArgsConstructor
public class UpdateImgReqDto {
    private MultipartFile cropImg;

    @Builder
    public UpdateImgReqDto(MultipartFile cropImg) {
        this.cropImg = cropImg;
    }
}
