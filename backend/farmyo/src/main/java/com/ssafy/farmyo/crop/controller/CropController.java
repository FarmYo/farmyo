package com.ssafy.farmyo.crop.controller;


import com.ssafy.farmyo.common.auth.CustomUserDetails;
import com.ssafy.farmyo.common.exception.CustomException;
import com.ssafy.farmyo.common.exception.ExceptionType;
import com.ssafy.farmyo.common.response.BaseResponseBody;
import com.ssafy.farmyo.crop.dto.*;
import com.ssafy.farmyo.crop.service.CropService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/crops")
@RequiredArgsConstructor
@Validated
@Slf4j
@Tag(name = "3.CROP", description = "CROP API")
public class CropController {

    private final CropService cropService;

    //작물등록
    @Operation(summary = "작물등록", description = "/crops\n\n 작물을 등록한다.")
    @PostMapping("")
    @ApiResponse(responseCode = "201", description = "성공 \n\n Success 반환")
    public ResponseEntity<? extends BaseResponseBody> createCrop(@RequestBody @Valid AddCropReqDto addCropReqDto, Authentication authentication) {

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        // 농부인지 구매자인지 확인
        if (userDetails.getJob() == 1) {
            throw new CustomException(ExceptionType.USER_FARMER_REQUIRED);
        }

        int savedCropId = cropService.addCrop(addCropReqDto, userDetails.getId());
        log.info(" 작물 등록 실행 loginId = {}, cropId = {}", authentication.getName(), savedCropId);

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(0, savedCropId));

    }

//    작물 리스트 조회
    @Operation(summary = "작물리스트조회", description = "/crops/list/{farmerLoginId}\n\n 해당 유저의 작물 리스트를 반환한다.")
    @GetMapping("/list/{farmerLoginId}")
    @ApiResponse(responseCode = "200", description = "성공 \n\n Success 반환")
    public ResponseEntity<? extends BaseResponseBody> getCropList(@PathVariable String farmerLoginId) {
        List<CropListResDto> cropsByFarmerLoginId = cropService.getCropsByFarmerLoginId(farmerLoginId);
        log.info("{} : 작물 리스트 조회 실행", farmerLoginId);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, cropsByFarmerLoginId));
    }


    // 작물 상세보기
    @Operation(summary = "작물상세조회", description = "/crops/{cropId}\n\n 해당 작물의 상세 정보를 반환한다.")
    @GetMapping("/{cropId}")
    @ApiResponse(responseCode = "200", description = "성공 \n\n Success 반환")
    public ResponseEntity<? extends BaseResponseBody> getCropDetail(@PathVariable int cropId) {
        CropDetailResDto cropDetail = cropService.getCropDetail(cropId);
        log.info("{} : 작물 상세 조회 실행", cropId);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, cropDetail));
    }
    


    //대표사진수정  사진 넣는걸로 바꿔야한다 url이 아니라 수정해야함 임시용
    @Operation(summary = "대표사진수정 아직 미완성", description = "/crops\n\n 작물의 대표 사진을 변경한다.")
    @PatchMapping(value = "/{cropId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiResponse(responseCode = "204", description = "성공 \n\n Success 반환")
    public ResponseEntity<? extends BaseResponseBody> updateCropImg(
            @PathVariable int cropId,
            @RequestParam(name = "cropImg") MultipartFile cropImg) {
        cropService.updateCropImgUrl(cropId, cropImg);
        log.info("{} : 대표 사진 수정 실행", cropId);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, "성공적으로 변경되었습니다."));
    }

    //작물인증정보 조회
    @Operation(summary = "작물인증정보조회", description = "/crops/{cropId}/cert")
    @GetMapping("/{cropId}/cert")
    @ApiResponse(responseCode = "200", description = "성공 \n\n success 반환")
    public ResponseEntity<? extends BaseResponseBody> getCropCerts(@PathVariable int cropId) {
        List<CropCertResDto> cropCertresDtoList = cropService.getCropCertList(cropId);
        log.info("{} : 작물 인증 정보 조회 실행", cropId);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, cropCertresDtoList));
    }

    //작물검사정보조회
    @Operation(summary = "작물검사정보조회", description = "/crops/{cropId}/inspection")
    @GetMapping("/{cropId}/inspection")
    @ApiResponse(responseCode = "200", description = "성공 \n\n success 반환")
    public ResponseEntity<? extends BaseResponseBody> getCropInspections(@PathVariable int cropId) {
        List<CropInspectResDto> cropInspectResDtoList = cropService.getCropInspectList(cropId);
        log.info("{} : 작물 검사 정보 조회 실행", cropId);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, cropInspectResDtoList));
    }

    //작물카테고리 조회
    @Operation(summary = "작물카테고리조회", description = "/crops/category\n\n 작물카테고리를 전부 불러온다.")
    @GetMapping("/category")
    @ApiResponse(responseCode = "200", description = "성공 \n\n Success 반환")
    public ResponseEntity<? extends BaseResponseBody> getAllCropCategories() {
        List<FindCropCategoryResDto> categories = cropService.findAllCropCategories();
        log.info("작물 카테고리 전체 조회 실행");
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, categories));
    }

    //작물블록체인 등록
    @Operation(summary = "작물블록체인등록", description = "/crops/{cropId}\n\n 작물 블록체인등록(1:농약,2:대회")
    @PostMapping("/{cropId}")
    @ApiResponse(responseCode = "201", description = "성공 \n\n Success 반환")
    public ResponseEntity<? extends BaseResponseBody> createCropBlockchain(@PathVariable int cropId, @RequestBody CropBlockchainResDto cropBlockchainResDto, Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        // 농부인지 구매자인지 확인
        if (userDetails.getJob() == 1) {
            throw new CustomException(ExceptionType.USER_FARMER_REQUIRED);
        }

        cropService.createBlockChain(cropId, userDetails.getId(), cropBlockchainResDto);
        log.info("작물 블록체인 등록 실행 {}", cropId);
        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(0, "성공적으로 블록체인에 저장되었습니다."));

    }
}

