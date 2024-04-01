package com.ssafy.farmyo.crop.repository;

import com.ssafy.farmyo.entity.Crop;
import com.ssafy.farmyo.entity.Trade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropRepository extends JpaRepository<Crop, Integer> {

    //농부loginid로 작물리스트조회
    List<Crop> findByFarmerIdOrderByIdDesc(int farmerId);

    @Query(value = "SELECT c FROM Crop c WHERE c.farmer.id = :farmerId AND c.cropStatus = 1 ORDER BY c.cropHarvestDate DESC ")
    List<Crop> findHarvestByFarmerIdOrderByCropHarvestDate(int farmerId);

}
