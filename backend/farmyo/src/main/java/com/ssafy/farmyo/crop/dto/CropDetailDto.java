package com.ssafy.farmyo.crop.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class CropDetailDto {
    private Integer id;
    private String cropName;
    private String cropImgUrl;
    //이거는 머지하고 해야할듯 cropentity바뀐부분 써야함
}
