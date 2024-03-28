package com.ssafy.farmyo.bank.service;

import com.ssafy.farmyo.bank.dto.BankCategoryResDto;
import com.ssafy.farmyo.bank.repository.BankRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BankServiceImpl implements BankService{

    private final BankRepository bankRepository;

    @Override
    public List<BankCategoryResDto> getCategory() {

        return bankRepository.getList();
    }
}
