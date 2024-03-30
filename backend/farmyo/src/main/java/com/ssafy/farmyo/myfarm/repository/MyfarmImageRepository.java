package com.ssafy.farmyo.myfarm.repository;

import com.ssafy.farmyo.entity.FarmImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MyfarmImageRepository extends JpaRepository<FarmImg, Integer> {

    @Query("SELECT i.imgUrl FROM FarmImg i WHERE i.farm.id = :id AND i.imgOrder = 1 ORDER BY i.createdAt")
    String getFirstUrl(int id);

    @Query("SELECT i FROM FarmImg i WHERE i.farm.id = :id")
    List<FarmImg> getFarmImgeList(int id);

    @Query("DELETE FROM FarmImg i WHERE i.farm.id = :id")
    void deleteAllByFarmId(int id);

}
