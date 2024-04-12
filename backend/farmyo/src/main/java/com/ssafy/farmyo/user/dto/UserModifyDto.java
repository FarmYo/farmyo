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

}