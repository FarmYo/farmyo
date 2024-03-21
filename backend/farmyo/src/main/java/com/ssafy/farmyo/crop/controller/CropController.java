package com.ssafy.farmyo.crop.controller;


import com.ssafy.farmyo.common.response.BaseResponseBody;
import com.ssafy.farmyo.crop.dto.AddCropReqDto;
import com.ssafy.farmyo.crop.dto.UpdateImgReqDto;
import com.ssafy.farmyo.crop.dto.FindCropCategoryDto;
import com.ssafy.farmyo.crop.service.CropService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<? extends BaseResponseBody> addCrop(@RequestBody @Valid AddCropReqDto addCropReqDto, Authentication authentication) {

        int savedCropId = cropService.addCrop(addCropReqDto,authentication);
        log.info("{}", savedCropId);

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(0, savedCropId));

    }


    //대표사진수정  사진 넣는걸로 바꿔야한다 url이 아니라 수정해야함 임시용
    @Operation(summary = "대표사진수정 아직 미완성", description = "/crops\n\n 작물의 대표 사진을 변경한다.")
    @PatchMapping("/{cropId}")
    @ApiResponse(responseCode = "204", description = "성공 \n\n Success 반환")
    public ResponseEntity<? extends BaseResponseBody> updateCropImg(@PathVariable Integer cropId, @RequestBody UpdateImgReqDto updateImgReqDto) {
        cropService.updateCropImgUrl(cropId, updateImgReqDto.getCropImgUrl());
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, "성공적으로 변경되었습니다."));
    }


    //작물카테고리 조회
    @Operation(summary = "작물카테고리조회", description = "/crops/category\n\n 작물카테고리를 전부 불러온다.")
    @GetMapping("/category")
    @ApiResponse(responseCode = "200", description = "성공 \n\n Success 반환")
    public ResponseEntity<? extends BaseResponseBody> getAllCropCategories() {
        List<FindCropCategoryDto> categories = cropService.findAllCropCategories();
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, categories));
    }
}

