package com.ssafy.farmyo.myfarm.repository;

import com.ssafy.farmyo.entity.FarmImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyfarmImageRepository extends JpaRepository<FarmImg, Integer> {
}
