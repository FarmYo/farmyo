package com.ssafy.farmyo.bank.service;

import com.ssafy.farmyo.bank.dto.BankCategoryResDto;

import java.util.List;

public interface BankService {
    // 은행 카테고리 리스트 조회
    List<BankCategoryResDto> getCategory();

}
