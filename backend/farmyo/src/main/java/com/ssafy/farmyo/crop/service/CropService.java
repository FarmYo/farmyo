package com.ssafy.farmyo.crop.service;

import com.ssafy.farmyo.crop.dto.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CropService {

    //작물 등록
    int addCrop(AddCropReqDto addCropReqDto, int farmerId);

    //작물 상세조회
    CropDetailResDto getCropDetail(int cropId);

    //농부작물 리스트 조회
    List<CropListResDto> getCropsByFarmerLoginId(String loginId);

    //작물 이미지 수정
    void updateCropImgUrl(int cropId, MultipartFile cropImg, int userId);

    //작물 인증 정보 조회
    List<CropCertResDto> getCropCertList(int cropId);

    //작물 검사 정보 조회
    List<CropInspectResDto> getCropInspectList(int cropId);

    //카테고리조회
    List<FindCropCategoryResDto> findAllCropCategories();

    //블록체인 기록 등록
    void createBlockChain(int cropId, int userId, CropBlockchainResDto cropBlockchainResDto);

    //농부의 수확한 작물만 조회
    List<HarvestCropListResDto> getHarvestCropList(String farmerLoginId, int userId);
}
