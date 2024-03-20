package com.ssafy.farmyo.crop.controller;

import com.ssafy.farmyo.common.response.BaseResponseBody;
import com.ssafy.farmyo.crop.dto.AddCropReqDto;
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
    public ResponseEntity<? extends BaseResponseBody> addCrop(@RequestBody @Valid AddCropReqDto addCropReqDto) {
        log.info("{}", addCropReqDto.getFarmer());

        int savedCropId =  cropService.addCrop(addCropReqDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(0, savedCropId));

    }







    //작물카테고리 조회
    @Operation(summary = "작물카테고리조회", description = "/crops/category\n\n 작물카테고리를 전부 불러온다." )
    @GetMapping("/category")
    @ApiResponse(responseCode = "200", description = "성공 \n\n Success 반환")
    public ResponseEntity<? extends BaseResponseBody> getAllCropCategories() {
        List<FindCropCategoryDto> categories = cropService.findAllCropCategories();
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, categories));
    }



}
