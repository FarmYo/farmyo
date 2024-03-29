package com.ssafy.farmyo.myfarm.repository;

import com.ssafy.farmyo.entity.FarmImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MyfarmImageRepository extends JpaRepository<FarmImg, Integer> {

    @Query("SELECT f FROM FarmImg f WHERE f.farm.id = :id AND f.imgOrder = 1")
    String getFirstUrl(int id);

}