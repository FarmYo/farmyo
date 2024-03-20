package com.ssafy.farmyo.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginReqDto {

    @NotBlank
    private String loginId;

    @NotBlank
    private String password;
}
