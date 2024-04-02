package com.ssafy.farmyo.myfarm.repository;

import com.ssafy.farmyo.entity.Farm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface MyfarmRepository extends JpaRepository<Farm, Integer> {

    @Query(value = "SELECT f FROM Farm f WHERE f.farmer.id = :id ")
    List<Farm> findAllByUserId(int id);

    @Query(value = "SELECT f FROM Farm f WHERE f.farmer.id = :id ")
    Page<Farm> findAllByUserId(int id, Pageable pageable);

    @Transactional
    @Modifying
    @Query(value = "UPDATE Farm f SET f.content = :content WHERE f.id = :id")
    void updateFarm(int id, String content);

}
