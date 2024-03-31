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
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
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

        String basicUrl = "https://yeopbucket.s3.ap-northeast-2.amazonaws.com/%EA%B8%B0%EB%B3%B8%20%EC%9D%B4%EB%AF%B8%EC%A7%80_1711798541181.png";


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
                .cropImgUrl(basicUrl)
                .build();
        
        crop = cropRepository.save(crop);


        // LocalDate 타입의 날짜를 yyyyMMdd 형식의 String으로 변환
        String formattedDate = crop.getCropPlantingDate().format(DateTimeFormatter.BASIC_ISO_DATE); // '20241031'

        // String을 BigInteger로 변환
        BigInteger plantingDate = new BigInteger(formattedDate);


        try {
            cropContractService.addPlantingInfo(BigInteger.valueOf(crop.getId()), crop.getCropName(), crop.getCropCultivationSite(), plantingDate);
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
    @Transactional
    public void updateCropImgUrl(int cropId, MultipartFile cropImg, int userId) {

        Crop crop = cropRepository.findById(cropId).orElseThrow(() -> new CustomException(ExceptionType.CROP_NOT_EXIST));

        if (!crop.getFarmer().getId().equals(userId)) {
            throw new CustomException(ExceptionType.CROP_NOT_OWNED_BY_FARMER);
        }


        String oldCropImgUrl = null;
        if (crop.getCropCategory() != null) {
            oldCropImgUrl = crop.getCropImgUrl();

        }


        String cropImgUrl = awsS3Service.uploadFile(cropImg);
        crop.updateCropImgUrl(cropImgUrl);
        if (oldCropImgUrl != null) {
            awsS3Service.deleteFileByUrl(oldCropImgUrl);
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
    @Transactional(readOnly = true)
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
    @Transactional(readOnly = true)
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

        //작물주인과 접속자가 다를 경우
        if (!crop.getFarmer().getId().equals(userId)) {
            throw new CustomException(ExceptionType.CROP_NOT_OWNED_BY_FARMER);
        }

        //작성일이 없을 경유
        if (cropBlockchainResDto.getEventDate() == null) {
            throw new CustomException(ExceptionType.EVENTDATE_INVALID);
        }
//        블록체인기능 다듬어서 넣을곳
        // LocalDate 타입의 날짜를 yyyyMMdd 형식의 String으로 변환
        String formattedDate = cropBlockchainResDto.getEventDate().format(DateTimeFormatter.BASIC_ISO_DATE); // '20241031'

        // String을 BigInteger로 변환
        BigInteger eventDate = new BigInteger(formattedDate);

        if (cropBlockchainResDto.getType() == 1) {

            if (cropBlockchainResDto.getPesticideName() == null || cropBlockchainResDto.getPesticideName().isEmpty()) {
                throw new CustomException(ExceptionType.PesticideName_INVALID);
            }
            if (cropBlockchainResDto.getPesticideType() == null || cropBlockchainResDto.getPesticideType().isEmpty()) {
                throw new CustomException(ExceptionType.PesticideCode_INVALID);
            }
            try {
                cropContractService.addUsageInfo(BigInteger.valueOf(crop.getId()), cropBlockchainResDto.getPesticideName(), cropBlockchainResDto.getPesticideType(), eventDate);
            } catch (Exception e) {
                throw new CustomException(ExceptionType.BLOCKCHAIN_FAILED_TO_CREATE);
            }
        } else if (cropBlockchainResDto.getType() == 2) {
            if (cropBlockchainResDto.getContestName() == null || cropBlockchainResDto.getContestName().isEmpty()) {
                throw new CustomException(ExceptionType.ContestName_INVALID);
            }
            if (cropBlockchainResDto.getAwardDetails() == null || cropBlockchainResDto.getAwardDetails().isEmpty()) {
                throw new CustomException(ExceptionType.AWARDDETAILS_INVALID);
            }
            try {
                cropContractService.addContestInfo(BigInteger.valueOf(crop.getId()), cropBlockchainResDto.getContestName(), cropBlockchainResDto.getAwardDetails(), eventDate);
            } catch (Exception e) {
                throw new CustomException(ExceptionType.BLOCKCHAIN_FAILED_TO_CREATE);
            }
        } else if (cropBlockchainResDto.getType() == 3) {
            try {
                cropContractService.addHarvestInfo(BigInteger.valueOf(crop.getId()), eventDate);
            } catch (Exception e) {
                throw new CustomException(ExceptionType.BLOCKCHAIN_FAILED_TO_CREATE);
            }
        } else {
            throw new CustomException(ExceptionType.TYPE_INVALID);
        }

    }
}
