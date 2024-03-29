package com.ssafy.farmyo.myfarm.controller;

import com.ssafy.farmyo.common.response.BaseResponseBody;
import com.ssafy.farmyo.myfarm.dto.MyfarmReqDto;
import com.ssafy.farmyo.myfarm.dto.MyfarmDto;
import com.ssafy.farmyo.myfarm.dto.UpUserDto;
import com.ssafy.farmyo.myfarm.service.MyfarmService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/farms")
@Tag(name = "7. Farm", description = "Farm API")
public class MyfarmController {

    private final MyfarmService myfarmService;

    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "마이팜 생성", description = "판매자는 userId와 사진, 게시글을 통해 마이팜 게시글을 생성한다.")
    public ResponseEntity<? extends BaseResponseBody> createFarm(
            @RequestParam("loginId") String loginId,
            @RequestParam("content") String content,
            @RequestParam("files") List<MultipartFile> files,
            @RequestParam("orders") List<Integer> orders) {
        log.info("{}, {}, {} : createFarm 실행", loginId, content, orders);

        myfarmService.createFarm(loginId, content, files, orders);

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(0, 0));
    }

    @GetMapping("/list")
    @Operation(summary = "마이팜 게시글 리스트 조회", description = "userId를 통해 작성한 마이팜 게시글 목록을 조회한다.")
    public ResponseEntity<? extends BaseResponseBody> getFarms(
            @RequestParam(name = "loginId")
            @Parameter(description = "유저 아이디")
            String loginId) {

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, 0));
    }

    @GetMapping("")
    @Operation(summary = "마이팜 게시글 상세 조회", description = "마이팜 id를 통해 해당 마이팜 게시글을 상세 조회한다.")
    public ResponseEntity<? extends BaseResponseBody> getFarm(
            @RequestParam(name = "id")
            @Parameter(description = "마이팜 게시글 id")
            int id) {

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, 0));
    }

    @PatchMapping("")
    @Operation(summary = "마이팜 게시글 수정", description = "마이팜 id와 수정할 정보를 통해 마이팜 게시글을 수정한다.")
    public ResponseEntity<? extends BaseResponseBody> updateFarm(
            @RequestBody
            MyfarmDto myfarmDto) {

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, 0));
    }

    @DeleteMapping("")
    @Operation(summary = "마이팜 게시글 삭제", description = "마이팜 id를 통해 해당 마이팜 게시글을 및 사진을 삭제한다.")
    public ResponseEntity<? extends BaseResponseBody> deleteFarm(
            @RequestParam(name = "id")
            @Parameter(description = "마이팜 게시글 삭제를 위한 마이팜 id")
            int id) {

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, 0));
    }

    @GetMapping("/user")
    @Operation(summary = "마이페이지 유저 정보 조회", description = "유저 id를 통해 ")
    public ResponseEntity<? extends  BaseResponseBody> getUpUser(
            @RequestParam(name = "loginId")
            @Parameter(description = "유저 아이디")
            String loginId) {
        UpUserDto upUserDto = myfarmService.getUpUser(loginId);

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, upUserDto));
    }

}
