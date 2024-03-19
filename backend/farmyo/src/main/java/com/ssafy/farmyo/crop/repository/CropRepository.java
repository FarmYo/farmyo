package com.ssafy.farmyo.crop.repository;

import com.ssafy.farmyo.entity.Crop;
import org.springframework.stereotype.Repository;

@Repository
public interface CropRepository {

    Crop findById(int id);

}
