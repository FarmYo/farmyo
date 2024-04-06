package com.ssafy.farmyo.ship.service;

import com.ssafy.farmyo.ship.dto.ShipCategoryResDto;
import com.ssafy.farmyo.ship.repository.ShipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShipServiceImpl implements ShipService{
    private final ShipRepository shipRepository;

    @Override
    public List<ShipCategoryResDto> getCategory() {
        return shipRepository.getList();
    }

}
