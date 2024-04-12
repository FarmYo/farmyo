package com.ssafy.farmyo.ship.service;

import com.ssafy.farmyo.ship.dto.ShipCategoryResDto;

import java.util.List;

public interface ShipService {
    //택배회사 카테고리 조회
    List<ShipCategoryResDto> getCategory();
}
