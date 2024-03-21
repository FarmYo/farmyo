package com.ssafy.farmyo.trade.repository;

import com.ssafy.farmyo.entity.TradeWithdrawal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TradeWithdrawalRepository extends JpaRepository<TradeWithdrawal, Integer> {
}
