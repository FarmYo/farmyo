package com.ssafy.farmyo.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressModifyDto {

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
