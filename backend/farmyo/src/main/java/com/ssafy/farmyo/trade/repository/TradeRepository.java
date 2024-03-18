package com.ssafy.farmyo.trade.repository;

import com.ssafy.farmyo.entity.Trade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TradeRepository extends JpaRepository<Trade, String> {

}
