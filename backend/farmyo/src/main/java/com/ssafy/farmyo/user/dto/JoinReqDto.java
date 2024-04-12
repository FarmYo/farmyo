package com.ssafy.farmyo.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class JoinReqDto {

    // 아이디
    @NotBlank(message = "유효하지 않은 아이디값입니다.")
    private String loginId;

    // 비밀번호
    @NotBlank
    private String password;

    // 닉네임
    @NotBlank
    private String nickname;

    // 전화번호
    @NotBlank
    private String telephone;

    // 직업
    private int job;

    // 이메일
    @Email
    @NotBlank
    private String email;


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

    // 사업자 등록 번호
    private String licenseNum;

    // 대표자 성명
    private String representative;

    // 개업일자
    private String startDate;
}
