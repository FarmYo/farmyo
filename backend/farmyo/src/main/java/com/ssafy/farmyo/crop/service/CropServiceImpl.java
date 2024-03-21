package com.ssafy.farmyo.crop.service;


import com.ssafy.farmyo.blockchain.service.CropContractService;
import com.ssafy.farmyo.common.auth.CustomUserDetails;
import com.ssafy.farmyo.common.exception.CustomException;
import com.ssafy.farmyo.common.exception.ExceptionType;
import com.ssafy.farmyo.crop.dto.AddCropReqDto;
import com.ssafy.farmyo.crop.dto.FindCropCategoryDto;
import com.ssafy.farmyo.crop.repository.CropCategoryRepository;
import com.ssafy.farmyo.crop.repository.CropRepository;
import com.ssafy.farmyo.entity.Crop;
import com.ssafy.farmyo.entity.CropCategory;
import com.ssafy.farmyo.entity.Farmer;
import com.ssafy.farmyo.user.repository.FarmerRepository;
import com.ssafy.farmyo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CropServiceImpl implements CropService {
    private final CropRepository cropRepository;
    private final CropCategoryRepository cropCategoryRepository;
    private final FarmerRepository farmerRepository;
    private final CropContractService cropContractService;
    private final UserRepository userRepository;



    //작물 등록
    @Override
    public Integer addCrop(AddCropReqDto addCropReqDto, Authentication authentication) {

//        // Authentication 객체와 userDetails가 null이 아닌지 확인
//        if (authentication == null || !(authentication.getPrincipal() instanceof CustomUserDetails)) {
//            throw new CustomException(ExceptionType.USER_LOGIN_REQUIRED); //
//        }
//        //농부 조회(아직 모름
//        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
//        if (userDetails.getJob() == 1) {
//            throw new CustomException(ExceptionType.USER_FARMER_REQUIRED);
//        }

        Optional<Farmer> optionalFarmer = farmerRepository.findById(6);
        if (optionalFarmer.isEmpty()) {
            throw new CustomException(ExceptionType.USER_NOT_EXIST);
        }
        Farmer farmer = optionalFarmer.get();

        //작물 카테고리 조회
        CropCategory cropCategory = cropCategoryRepository.findById(addCropReqDto.getCropCategoryId())
                .orElseThrow(() -> new CustomException(ExceptionType.CATEGORY_NOT_EXIST));


        Crop crop = Crop.builder()
                .farmer(farmer)
                .cropCategory(cropCategory)
                .cropName(addCropReqDto.getCropName())
                .cropCultivationSite(addCropReqDto.getCultivation())
                .cropPlantingDate(addCropReqDto.getPlantingDate())
                .cropStatus(0)
                .build();
        crop = cropRepository.save(crop);


        //블록체인기능 다듬어서 넣을곳
//        cropContractService.addBasicInfo(BigInteger.valueOf(crop.getId()), crop.getCropName());


        return crop.getId();
    }


    //작물 사진 업데이트
    @Override
    public void updateCropImgUrl(Integer cropId, String cropImgUrl) {
        Optional<Crop> cropOptional = cropRepository.findById(cropId);
        if (cropOptional.isPresent()) {
            Crop crop = cropOptional.get();
            crop.updateCropImgUrl(cropImgUrl);
            cropRepository.save(crop);
        } else {
            throw new CustomException(ExceptionType.CROP_NOT_EXIST);
        }

    }









    //모든 카테고리 조회
    @Override
    public List<FindCropCategoryDto> findAllCropCategories() {
        return cropCategoryRepository.findAll().stream()
                .map(FindCropCategoryDto::toDto)
                .collect(Collectors.toList());
    }
}
