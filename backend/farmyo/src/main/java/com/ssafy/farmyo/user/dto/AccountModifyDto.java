package com.ssafy.farmyo.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountModifyDto {

    // 예금주
    @NotBlank
    private String depositor;

    // 은행명
    @NotBlank
    private String bank;

    // 계좌번호
    @NotBlank
    private String account;
}
