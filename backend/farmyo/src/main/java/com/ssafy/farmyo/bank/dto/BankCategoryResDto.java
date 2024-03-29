package com.ssafy.farmyo.bank.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BankCategoryResDto {

    // 식별 ID
    private Integer id;

    // 은행명
    private String bankName;
}
