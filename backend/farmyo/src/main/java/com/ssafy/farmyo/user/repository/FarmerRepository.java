package com.ssafy.farmyo.user.repository;

import com.ssafy.farmyo.entity.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FarmerRepository extends JpaRepository<Farmer, Integer> {
    Optional<Farmer> findById(Integer id);
}
