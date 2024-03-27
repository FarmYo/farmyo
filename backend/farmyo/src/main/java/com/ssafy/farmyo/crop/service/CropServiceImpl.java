package com.ssafy.farmyo.crop.service;


import com.ssafy.farmyo.blockchain.service.CropContractService;
import com.ssafy.farmyo.common.exception.CustomException;
import com.ssafy.farmyo.common.exception.ExceptionType;
import com.ssafy.farmyo.common.s3.AwsS3Service;
import com.ssafy.farmyo.crop.dto.*;
import com.ssafy.farmyo.crop.repository.CropCategoryRepository;
import com.ssafy.farmyo.crop.repository.CropRepository;
import com.ssafy.farmyo.entity.Crop;
import com.ssafy.farmyo.entity.CropCategory;
import com.ssafy.farmyo.entity.Farmer;
import com.ssafy.farmyo.user.repository.FarmerRepository;
import com.ssafy.farmyo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigInteger;
import java.time.ZoneId;
import java.time.ZonedDateTime;
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
    private final AwsS3Service awsS3Service;


    //작물 등록
    @Override
    @Transactional
    public int addCrop(AddCropReqDto addCropReqDto, int farmerId) {


        //해당 id의 파머가 있는지 확인
        Optional<Farmer> optionalFarmer = farmerRepository.findById(farmerId);
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
                .cropName(cropCategory.getCategoryName())
                .cropCultivationSite(addCropReqDto.getCultivation())
                .cropPlantingDate(addCropReqDto.getPlantingDate())
                .cropStatus(0)
                .build();
        crop = cropRepository.save(crop);


//        블록체인기능 다듬어서 넣을곳
        // localDate타입 timeStamp로 바꾸기 블록체인 통신을 위해 bigInteger로 바꿔야함
        ZonedDateTime zdt = crop.getCropPlantingDate().atStartOfDay(ZoneId.of("Asia/Seoul"));

        //zdt를 타임스탬프로 변환
        long unixTimeStamp = zdt.toEpochSecond();

        //Unix타임스탬프를 BigInteger로 변환
        BigInteger plantingDate = BigInteger.valueOf(unixTimeStamp);


        try {
            cropContractService.addBasicInfo(BigInteger.valueOf(crop.getId()), crop.getCropName(), crop.getCropCultivationSite(), plantingDate);
        } catch (Exception e) {
            throw new CustomException(ExceptionType.BLOCKCHAIN_FAILED_TO_CREATE);
        }

        return crop.getId();
    }


    //작물상세조회
    public CropDetailResDto getCropDetail(int cropId) {
        Crop findCrop = cropRepository.findById(cropId)
                .orElseThrow(() -> new CustomException(ExceptionType.CROP_NOT_EXIST));
        return CropDetailResDto.builder()
                .id(findCrop.getId())
                .cropName(findCrop.getCropName())
                .cropImgUrl(findCrop.getCropImgUrl())
                .cropStatus(findCrop.getCropStatus())
                .cropPlantingDate(findCrop.getCropPlantingDate())
                .cropHarvestDate(findCrop.getCropHarvestDate())
                .cropCultivationSite(findCrop.getCropCultivationSite())
                .build();
    }


    //작물 사진 업데이트
    @Override
    public void updateCropImgUrl(int cropId, MultipartFile cropImg) {
        Optional<Crop> cropOptional = cropRepository.findById(cropId);
        if (cropOptional.isPresent()) {

            String cropImgUrl = awsS3Service.uploadFile(cropImg);

            Crop crop = cropOptional.get();
            crop.updateCropImgUrl(cropImgUrl);
            cropRepository.save(crop);
        } else {
            throw new CustomException(ExceptionType.CROP_NOT_EXIST);
        }

    }


    //농부 작물 리스트 조회
    @Override
    public List<CropListResDto> getCropsByFarmerLoginId(String loginId) {
        Optional<Farmer> farmerOptional = farmerRepository.findByLoginId(loginId);
        if (farmerOptional.isEmpty()) {
            throw new CustomException(ExceptionType.USER_NOT_EXIST);
        } else {
            Farmer farmer = farmerOptional.get();
            List<Crop> crops = cropRepository.findByFarmerId(farmer.getId());
            return crops.stream()
                    .map(crop -> CropListResDto.builder()
                            .id(crop.getId())
                            .cropStatus(crop.getCropStatus())
                            .cropHarvestDate(crop.getCropHarvestDate())
                            .cropImgUrl(crop.getCropImgUrl())
                            .cropName(crop.getCropName())
                            .build())
                    .collect(Collectors.toList());
        }
    }

    //작물 인증 정보 조회
    @Override
    @Transactional
    public List<CropCertResDto> getCropCertList(int cropId) {
        Crop crop = cropRepository.findById(cropId)
                .orElseThrow(() -> new CustomException(ExceptionType.CROP_NOT_EXIST));
        return crop.getCropCertList().stream()
                .map(cert -> CropCertResDto.builder()
                        .id(cert.getId())
                        .certNumber(cert.getCertNumber())
                        .certName(cert.getCertName())
                        .certCorp(cert.getCertCorp())
                        .certDate(cert.getCertDate())
                        .build())
                .collect(Collectors.toList());


    }

    //작물 검사 정보 조회
    @Override
    @Transactional
    public List<CropInspectResDto> getCropInspectList(int cropId) {
        Crop crop = cropRepository.findById(cropId)
                .orElseThrow(() -> new CustomException(ExceptionType.CROP_NOT_EXIST));
        return crop.getCropInspectList().stream()
                .map(inspect -> CropInspectResDto.builder()
                        .id(inspect.getId())
                        .inspectNumber(inspect.getInspectNumber())
                        .inspectName(inspect.getInspectName())
                        .inspectResult(inspect.getInspectResult())
                        .inspectCorp(inspect.getInspectCorp())
                        .inspectDate(inspect.getInspectDate())
                        .build())
                .collect(Collectors.toList());
    }


    //모든 카테고리 조회
    @Override
    public List<FindCropCategoryResDto> findAllCropCategories() {
        return cropCategoryRepository.findAll().stream()
                .map(FindCropCategoryResDto::toDto)
                .collect(Collectors.toList());
    }


    //블록체인 기록 등록

    @Override
    public void createBlockChain(int cropId, int userId, CropBlockchainResDto cropBlockchainResDto) {


        Crop crop = cropRepository.findById(cropId)
                .orElseThrow(() -> new CustomException(ExceptionType.CROP_NOT_EXIST));
        // localDate타입 timeStamp로 바꾸기 블록체인 통신을 위해 bigInteger로 바꿔야함

        //작물주인과 접속자가 다를 경우
        if (!crop.getFarmer().getId().equals(userId)) {
            throw new CustomException(ExceptionType.CROP_NOT_OWNED_BY_FARMER);
        }

        //작성일이 없을 경유
        if (cropBlockchainResDto.getEventDate() == null) {
            throw new CustomException(ExceptionType.EVENTDATE_INVALID);
        }
        ZonedDateTime zdt = cropBlockchainResDto.getEventDate().atStartOfDay(ZoneId.of("Asia/Seoul"));

        //zdt를 타임스탬프로 변환
        long unixTimeStamp = zdt.toEpochSecond();

        //Unix타임스탬프를 BigInteger로 변환
        BigInteger eventDate = BigInteger.valueOf(unixTimeStamp);

        if (cropBlockchainResDto.getType() == 1) {

            if (cropBlockchainResDto.getPesticideName().isEmpty()) {
                throw new CustomException(ExceptionType.PesticideName_INVALID);
            }
            if (cropBlockchainResDto.getPesticideType().isEmpty()) {
                throw new CustomException(ExceptionType.PesticideCode_INVALID);
            }
            try {
                cropContractService.addUsageInfo(BigInteger.valueOf(crop.getId()), cropBlockchainResDto.getPesticideName(), cropBlockchainResDto.getPesticideType(), eventDate);
            } catch (Exception e) {
                throw new CustomException(ExceptionType.BLOCKCHAIN_FAILED_TO_CREATE);
            }
        } else {
            if (cropBlockchainResDto.getContestName().isEmpty()) {
                throw new CustomException(ExceptionType.ContestName_INVALID);
            }
            if (cropBlockchainResDto.getAwardDetails().isEmpty()) {
                throw new CustomException(ExceptionType.BLOCKCHAIN_FAILED_TO_CREATE);
            }
            try {
                cropContractService.addContestInfo(BigInteger.valueOf(crop.getId()), cropBlockchainResDto.getContestName(), cropBlockchainResDto.getAwardDetails(), eventDate);
            } catch (Exception e) {
                throw new CustomException(ExceptionType.BLOCKCHAIN_FAILED_TO_CREATE);
            }
        }

    }
}
