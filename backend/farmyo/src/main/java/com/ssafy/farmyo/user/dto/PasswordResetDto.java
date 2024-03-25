package com.ssafy.farmyo.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordResetDto {

    // 현재 변경하고자 하는 유저의 로그인 아이디
    public String loginId;

    // 현재 변경하고자 하는 유저의 이메일
    public String email;

    // 변경 비밀번호
    public String password;
}
