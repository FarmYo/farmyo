package com.ssafy.farmyo.bank.repository;

import com.ssafy.farmyo.bank.dto.BankCategoryResDto;
import com.ssafy.farmyo.entity.BankCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BankRepository extends JpaRepository<BankCategory, Integer> {

    @Query("select new com.ssafy.farmyo.bank.dto.BankCategoryResDto(b.id, b.categoryName) FROM BankCategory b ORDER BY b.categoryName")
    List<BankCategoryResDto> getList();
}
