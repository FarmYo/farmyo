package com.ssafy.farmyo.trade.repository;

import com.ssafy.farmyo.entity.Trade;
import com.ssafy.farmyo.entity.TradeDeposit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TradeDepositRepository extends JpaRepository<TradeDeposit, Integer> {
}
