package com.ssafy.farmyo.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserModifyDto {

    // 닉네임
    @NotBlank
    private String nickname;

    // 전화번호
    @NotBlank
    private String telephone;

    // 상태메세지
    private String comment;

    // 예금주
    @NotBlank
    private String depositor;

    // 은행명
    @NotBlank
    private String bank;

    // 계좌번호
    @NotBlank
    private String account;

    // 우편번호
    @NotBlank
    private String addressCode;

    // 법정주소
    @NotBlank
    private String addressLegal;

    // 상세주소
    @NotBlank
    private String addressDetail;
}