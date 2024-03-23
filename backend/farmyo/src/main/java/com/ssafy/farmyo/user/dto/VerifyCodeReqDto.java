package com.ssafy.farmyo.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class VerifyCodeReqDto {

    // 인증 이메일
    @NotBlank
    @Email
    private String email;

    // 인증 번호
    @NotBlank
    private String authCode;
}
