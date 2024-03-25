package com.ssafy.farmyo.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordUpdateDto {

    // 이전 비밀번호
    public String pastPassword;

    // 수정하고자 하는 비밀번호
    public String newPassword;
}
