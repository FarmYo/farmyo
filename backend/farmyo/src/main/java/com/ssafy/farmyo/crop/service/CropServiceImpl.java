package com.ssafy.farmyo.crop.service;

import com.ssafy.farmyo.blockchain.service.CropContractService;
import com.ssafy.farmyo.common.exception.CustomException;
import com.ssafy.farmyo.common.exception.ExceptionType;
import com.ssafy.farmyo.crop.dto.AddCropReqDto;
import com.ssafy.farmyo.crop.dto.FindCropCategoryDto;
import com.ssafy.farmyo.crop.repository.CropCategoryRepository;
import com.ssafy.farmyo.crop.repository.CropRepository;
import com.ssafy.farmyo.entity.Crop;
import com.ssafy.farmyo.entity.CropCategory;
import com.ssafy.farmyo.entity.Farmer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CropServiceImpl implements CropService {
    private final CropRepository cropRepository;
    private final CropCategoryRepository cropCategoryRepository;
    private final CropContractService cropContractService;



    @Override
    public Integer addCrop(AddCropReqDto addCropReqDto) {

        //농부 조회(아직 모름
        Farmer farmer;

        //작물 카테고리 조회
        CropCategory cropCategory = cropCategoryRepository.findById(addCropReqDto.getCropCategoryId())
                .orElseThrow(() -> new CustomException(ExceptionType.CROP_NOT_EXIST));

        //농부는 일단 어떻게 받아서 넣을지 몰라서null처리
        Crop crop = Crop.builder()
                .farmer(null)
                .cropCategory(cropCategory)
                .cropName(addCropReqDto.getCropName())
                .cropBlockchainAddress(null)
                .cropImgUrl(null)
                .build();
        crop = cropRepository.save(crop);


        //블록체인기능 다듬어서 넣을곳
//        cropContractService.addBasicInfo(BigInteger.valueOf(crop.getId()), crop.getCropName());


        return crop.getId();
    }

    @Override
    public List<FindCropCategoryDto> findAllCropCategories() {
        return cropCategoryRepository.findAll().stream()
                .map(FindCropCategoryDto::toDto)
                .collect(Collectors.toList());
    }
}
