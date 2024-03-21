package com.ssafy.farmyo.crop.repository;

import com.ssafy.farmyo.entity.CropCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CropCategoryRepository extends JpaRepository<CropCategory, Integer> {
}
