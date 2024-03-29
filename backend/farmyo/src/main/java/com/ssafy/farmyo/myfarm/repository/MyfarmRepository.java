package com.ssafy.farmyo.myfarm.repository;

import com.ssafy.farmyo.entity.Farm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MyfarmRepository extends JpaRepository<Farm, Integer> {

    @Query(value = "SELECT f FROM Farm f WHERE f.farmer.id = :id ")
    List<Farm> findAllByUserId(int id);

}
