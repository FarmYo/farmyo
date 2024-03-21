package com.ssafy.farmyo.crop.service;

import com.ssafy.farmyo.crop.dto.AddCropReqDto;
import com.ssafy.farmyo.crop.dto.CropListDto;
import com.ssafy.farmyo.crop.dto.FindCropCategoryDto;
import com.ssafy.farmyo.entity.Crop;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface CropService {

    //작물 등록
    Integer addCrop(AddCropReqDto addCropReqDto, Authentication authentication);


    //농부작물 리스트 조회
    List<CropListDto> getCropsByFarmerLoginId(String loginId);

    //작물 이미지 수정
    void updateCropImgUrl(Integer cropId, String cropImgUrl);


    //카테고리조회
    List<FindCropCategoryDto> findAllCropCategories();
}
