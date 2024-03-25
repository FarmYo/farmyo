package com.ssafy.farmyo.user.controller;

import com.ssafy.farmyo.common.auth.CustomUserDetails;
import com.ssafy.farmyo.common.response.BaseResponseBody;
import com.ssafy.farmyo.user.dto.JoinReqDto;
import com.ssafy.farmyo.user.dto.VerifyCodeReqDto;
import com.ssafy.farmyo.user.dto.VerifyEmailReqDto;
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
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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

    @Operation(summary = "비밀번호 찾기를 위한 이메일 인증", description = "/users/pwd/auth\n\n 사용자는 비밀번호 찾기를 위해 이메일 인증을 한다.")
    @PostMapping("/email/password")
    @ApiResponse(responseCode = "200", description = "성공 \n\n Success 반환")
    public ResponseEntity<? extends BaseResponseBody> verifyPasswordRecoveryEmail(@Valid @RequestBody VerifyEmailReqDto verifyEmailReqDto) throws Exception {

        // 메일 전송 후 코드 받기
        mailService.sendPasswordRecoveryMessage(verifyEmailReqDto.getEmail());
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

    @Operation(summary = "회원 정보 불러오기", description = "현재 로그인한 회원의 정보를 가져온다.")
    @GetMapping("")
    @ApiResponse(responseCode = "200", description = "성공 \n\n 유저 정보를 담은 DTO 반환 ")
    public ResponseEntity<? extends BaseResponseBody> getUserInfo(Authentication authentication) {

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        log.info("User 식별 ID : {}", userDetails.getId());

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, userService.getUserInfo(userDetails.getId())));
    }
}
