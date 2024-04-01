package com.ssafy.farmyo.crop.repository;

import com.ssafy.farmyo.entity.Crop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropRepository extends JpaRepository<Crop, Integer> {

    //농부loginid로 작물리스트조회
    List<Crop> findByFarmerIdOrderByIdDesc(int farmerId);

}
