package com.ssafy.farmyo.user.controller;

import com.ssafy.farmyo.common.auth.CustomUserDetails;
import com.ssafy.farmyo.common.response.BaseResponseBody;
import com.ssafy.farmyo.user.dto.JoinReqDto;
import com.ssafy.farmyo.user.service.UserService;
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

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Validated
@Slf4j
@Tag(name="1.USER", description="USER API")
public class UserController {

    private final UserService userService;

    @Operation(summary = "회원가입", description = "/users\n\n 사용자의 정보를 통해 회원가입 한다.")
    @PostMapping("")
    @ApiResponse(responseCode = "201", description = "성공 \n\n Success 반환")
    public ResponseEntity<? extends BaseResponseBody> join(@RequestBody @Valid JoinReqDto joinReqDto) {

        log.info("{}", joinReqDto.getLoginId());

        // 회원가입
        int savedUserId = userService.join(joinReqDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(0, savedUserId));
    }

    @GetMapping("/test")
    public ResponseEntity<? extends BaseResponseBody> tokenTest(Authentication authentication) {

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        log.info("User 식별 ID : {}", userDetails.getId());
        log.info("User LoginId : {}", userDetails.getUsername());
        log.info("User 직업 : {}", userDetails.getJob());

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(0, "경로별 인가 성공"));
    }


}
