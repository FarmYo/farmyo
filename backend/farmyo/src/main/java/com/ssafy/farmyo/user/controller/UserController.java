package com.ssafy.farmyo.user.controller;

import com.ssafy.farmyo.common.auth.CustomUserDetails;
import com.ssafy.farmyo.common.response.BaseResponseBody;
import com.ssafy.farmyo.user.dto.*;
import com.ssafy.farmyo.user.service.MailService;
import com.ssafy.farmyo.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
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

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Validated
@Slf4j
@Tag(name="1.USER", description="USER API")
public class UserController {

    private final UserService userService;
    private final MailService mailService;

    @Operation(summary = "회원가입", description = "/users\n\n 사용자의 정보를 통해 회원가입 한다.")
    @PostMapping("")
    @ApiResponse(responseCode = "201", description = "성공 \n\n Success 반환")
    public ResponseEntity<? extends BaseResponseBody> join(@RequestBody @Valid JoinReqDto joinReqDto) {

        int savedUserId = 0;

        if(joinReqDto.getJob() == 0){
            // 생산자
            savedUserId = userService.farmerJoin(joinReqDto);
        }else{
            // 소비자
            savedUserId = userService.customerJoin(joinReqDto);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(0, savedUserId));
    }

    @GetMapping("/test")
    public ResponseEntity<? extends BaseResponseBody> tokenTest(Authentication authentication) {

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        log.info("User 식별 ID : {}", userDetails.getId());
        log.info("User LoginId : {}", userDetails.getUsername());
        log.info("User 직업 : {}", userDetails.getJob());
        log.info("User 이름 : {}", userDetails.getNickname());

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(0, "경로별 인가 성공"));
    }

    @Operation(summary = "회원가입을 위한 이메일 인증", description = "/users/join/auth\n\n 사용자는 회원가입을 위해 이메일 인증을 한다.")
    @PostMapping("/email")
    @ApiResponse(responseCode = "200", description = "성공 \n\n Success 반환")
    public ResponseEntity<? extends BaseResponseBody> verifyJoinEmail(@Valid @RequestBody VerifyEmailReqDto verifyEmailReqDto) throws Exception {

        log.info("verifyJoinEmail : 회원가입을 위한 이메일 인증");

        // 메일 전송 후 코드 받기
        mailService.sendJoinMessage(verifyEmailReqDto.getEmail());
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, "Success"));
    }

    @Operation(summary = "이메일 인증 확인", description = "/users/auth/check\n\n 사용자는 이메일 인증 확인을 한다.")
    @PostMapping("/auth/check")
    @ApiResponse(responseCode = "200", description = "성공 \n\n Success 반환")
    public ResponseEntity<? extends BaseResponseBody> verifyEmailCode(@Valid @RequestBody VerifyCodeReqDto verifyCodeReqDto) {

        // 인증 코드 확인 후 토큰 반환 (주석 이유 : 추가 로직 필요!)
        // String token = mailService.validateAuthCode(verifyCodeReqDto);
        mailService.validateAuthCode(verifyCodeReqDto);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, "Success"));
    }

    @Operation(summary = "비밀번호 찾기를 위한 이메일 인증", description = "/users/email/password\n\n 사용자는 비밀번호 찾기를 위해 이메일 인증을 한다.")
    @PostMapping("/email/password")
    @ApiResponse(responseCode = "200", description = "성공 \n\n Success 반환")
    public ResponseEntity<? extends BaseResponseBody> verifyPasswordRecoveryEmail(@Valid @RequestBody VerifyEmailReqDto verifyEmailReqDto) throws Exception {

        log.info("{}", verifyEmailReqDto.getEmail());
        log.info("{}", verifyEmailReqDto.getLoginId());

        // 메일 전송 후 코드 받기
        mailService.sendPasswordRecoveryMessage(verifyEmailReqDto);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, "Success"));
    }

    @Operation(summary = "아이디 중복검사", description = "사용자가 작성한 아이디의 중복검사를 한다.")
    @GetMapping("/join/duplicate")
    @ApiResponse(responseCode = "200", description = "성공 \n\n ")
    public ResponseEntity<? extends BaseResponseBody> checkIdDuplicate(@RequestParam
                                                                           @Parameter(description = "회원가입 시 입력한 로그인 아이디")
                                                                           String id) {
        log.info("checkIdDuplicate Id : {}", id);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, userService.checkIdDuplicate(id)));
    }

    @Operation(summary = "회원 정보 조회", description = "현재 로그인한 회원의 정보를 조회")
    @GetMapping("")
    @ApiResponse(responseCode = "200", description = "성공 \n\n 유저 정보를 담은 DTO 반환 ")
    public ResponseEntity<? extends BaseResponseBody> getUserInfo(Authentication authentication) {

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        log.info("User 식별 ID : {}", userDetails.getId());

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, userService.getUserInfo(userDetails.getId())));
    }

    @Operation(summary = "비밀번호 초기화", description = "비밀번호 찾기에서 비밀번호 수정")
    @PatchMapping("/password/reset")
    @ApiResponse(responseCode = "200", description = "성공 \n\n Success 반환 ")
    public ResponseEntity<? extends BaseResponseBody> resetPassword(@Parameter(description = "비밀번호 초기화를 위한 정보를 담는 Dto")
                                                                    @RequestBody PasswordResetDto passwordResetDto) {

        log.info("{}", passwordResetDto.getEmail());
        log.info("{}", passwordResetDto.getLoginId());
        log.info("{}", passwordResetDto.getPassword());

        userService.resetPassword(passwordResetDto);

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, "Success"));
    }

    @Operation(summary = "비밀번호 수정", description = "현재 비밀번호와 변경할 비밀번호를 DTO에 받아 비밀번호 수정")
    @PatchMapping("/password/update")
    @ApiResponse(responseCode = "200", description = "성공 \n\n Success 반환 ")
    public ResponseEntity<? extends BaseResponseBody> updatePassword(@Parameter(description = "비밀번호 수정을 위한 정보를 담는 Dto")
                                                                     @RequestBody PasswordUpdateDto passwordUpdateDto,
                                                                     Authentication authentication) {

        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        userService.updatePassword(customUserDetails.getId(), passwordUpdateDto);

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, "Success"));
    }

    @Operation(summary = "회원정보 수정", description = "회원 수정 DTO를 받아 회원 정보 수정")
    @PatchMapping("")
    @ApiResponse(responseCode = "200", description = "성공 \n\n Success 반환 ")
    public ResponseEntity<? extends BaseResponseBody> modifyUser(@Parameter(description = "유저 수정을 위한 정보를 담는 Dto")
                                                                 @RequestBody UserModifyDto userModifyDto,
                                                                 Authentication authentication) {

        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        userService.modifyUserInfo(customUserDetails.getId(), userModifyDto);

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, "Success"));
    }

    @Operation(summary = "회원 탈퇴", description = "회원탈퇴")
    @PatchMapping("/deactivate")
    @ApiResponse(responseCode = "200", description = "성공 \n\n Success 반환 ")
    public ResponseEntity<? extends BaseResponseBody> modifyUser(Authentication authentication) {

        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        userService.deactivateUser(customUserDetails.getId());

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, "Success"));
    }

    @Operation(summary = "계좌 수정", description = "수정 정보를 받아 해당 유저의 계좌를 변경")
    @PatchMapping("/account")
    @ApiResponse(responseCode = "200", description = "성공 \n\n Success 반환 ")
    public ResponseEntity<? extends BaseResponseBody> modifyAccountInfo(@Parameter(description = "계좌 수정 정보") @Valid @RequestBody AccountModifyDto accountModifyDto,
            Authentication authentication) {

        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        userService.modifyAccountInfo(customUserDetails.getId(), accountModifyDto);

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, "Success"));
    }

    @Operation(summary = "주소 수정", description = "수정 정보를 받아 해당 유저의 주소를 변경")
    @PatchMapping("/address")
    @ApiResponse(responseCode = "200", description = "성공 \n\n Success 반환 ")
    public ResponseEntity<? extends BaseResponseBody> modifyAddressInfo(@Parameter(description = "주소 수정 정보") @Valid @RequestBody AddressModifyDto addressModifyDto,
            Authentication authentication) {

        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        userService.modifyAddressInfo(customUserDetails.getId(), addressModifyDto);


        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, "Success"));
    }

    @Operation(summary = "즐겨찾기 추가", description = "현재 로그인한 회원이 해당 농부를 즐겨찾기 추가")
    @PostMapping("/bookmarks")
    @ApiResponse(responseCode = "201", description = "성공 \n\n Success 반환 ")
    public ResponseEntity<? extends BaseResponseBody> addBookmark(
            @Parameter(description = "즐겨찾기 관련 농부 정보") @RequestBody BookmarkReqDto bookmarkReqDto,
            Authentication authentication) {

        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        userService.addBookmark(customUserDetails.getId(), bookmarkReqDto.getFarmerLoginId());

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(0, "Success"));
    }

    @Operation(summary = "즐겨찾기 조회", description = "소비자가 자신이 즐겨찾기한 농부 리스트를 조회")
    @GetMapping("/bookmarks")
    @ApiResponse(responseCode = "200", description = "성공 \n\n Success 반환 ")
    public ResponseEntity<? extends BaseResponseBody> getBookmarkList(Authentication authentication) {

        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, userService.getBookmarkList(customUserDetails.getId())));
    }

    @Operation(summary = "즐겨찾기 삭제", description = "현재 로그인한 회원이 해당 농부를 즐겨찾기 삭제")
    @DeleteMapping("/bookmarks")
    @ApiResponse(responseCode = "200", description = "성공 \n\n Success 반환 ")
    public ResponseEntity<? extends BaseResponseBody> removeBookmark(
            @Parameter(description = "삭제하고자 하는 즐겨찾기 PK값") @RequestParam("bookmarkId") int bookmarkId,
            Authentication authentication) {

        log.info("{}", bookmarkId);

        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        userService.removeBookmark(customUserDetails.getId(), bookmarkId);

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, "Success"));
    }

    // 프로필 사진 수정
    @Operation(summary = "프로필 사진 수정", description = "/users\n\n 프로필의 대표 사진을 변경한다.")
    @PatchMapping(value = "/profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiResponse(responseCode = "204", description = "성공 \n\n Success 반환")
    public ResponseEntity<? extends BaseResponseBody> updateProfileImg(
            @RequestParam(name = "profileImg") MultipartFile profileImg,
            Authentication authentication) {

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        userService.modifyProfileImg(userDetails.getId(), profileImg);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(BaseResponseBody.of(0, "Success"));
    }
}
