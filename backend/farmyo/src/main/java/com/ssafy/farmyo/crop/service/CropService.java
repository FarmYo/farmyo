package com.ssafy.farmyo.crop.service;

import com.ssafy.farmyo.crop.dto.*;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface CropService {

    //작물 등록
    Integer addCrop(AddCropReqDto addCropReqDto, int farmerId);

    //작물 상세조회
    CropDetailResDto getCropDetail(int cropId);

    //농부작물 리스트 조회
    List<CropListResDto> getCropsByFarmerLoginId(String loginId);

    //작물 이미지 수정
    void updateCropImgUrl(int cropId, String cropImgUrl);

    //작물 인증 정보 조회
    List<CropCertResDto> getCropCertList(int cropId);

    //작물 검사 정보 조회
    List<CropInspectResDto> getCropInspectList(int cropId);

    //카테고리조회
    List<FindCropCategoryResDto> findAllCropCategories();
}
