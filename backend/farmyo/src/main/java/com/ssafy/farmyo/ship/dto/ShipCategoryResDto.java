package com.ssafy.farmyo.ship.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ShipCategoryResDto {
    private int id;
    private String shipName;
}
