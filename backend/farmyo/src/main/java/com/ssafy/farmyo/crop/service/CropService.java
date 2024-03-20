package com.ssafy.farmyo.crop.service;

import com.ssafy.farmyo.crop.dto.AddCropReqDto;
import com.ssafy.farmyo.crop.dto.FindCropCategoryDto;

import java.util.List;

public interface CropService {

    //작물 등록
    Integer addCrop(AddCropReqDto addCropReqDto);


    //카테고리조회
    List<FindCropCategoryDto> findAllCropCategories();
}
