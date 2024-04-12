package com.ssafy.farmyo.user.dto;

import com.ssafy.farmyo.entity.Account;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserResDto {

    // 로그인 아이디
    public String loginId;

    // 이메일
    public String email;

    // 닉네임
    public String nickname;

    // 전화번호
    public String telephone;

    // 한 줄 소감
    public String comment;

    // 계좌
    public Account account;

    // 주소 코드
    public String addressCode;

    // 법정 코드
    public String addressLegal;

    // 상세 주소
    public String addressDetail;

    // 프로필 이미지
    public String profile;
}


