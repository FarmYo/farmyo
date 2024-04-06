package com.ssafy.farmyo.ship.repository;

import com.ssafy.farmyo.entity.ShipCategory;
import com.ssafy.farmyo.ship.dto.ShipCategoryResDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ShipRepository extends JpaRepository<ShipCategory, Integer> {

    @Query("select new com.ssafy.farmyo.ship.dto.ShipCategoryResDto (s.id, s.shipName) FROM ShipCategory s ORDER BY s.shipName")
    List<ShipCategoryResDto> getList();
}
