package com.ssafy.farmyo.user.repository;

import com.ssafy.farmyo.entity.Favorite;
import com.ssafy.farmyo.user.dto.BookmarkResDto;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {

    // 즐겨찾기 등록
    @Query("SELECT f from Favorite f WHERE f.user.id = :userId AND f.farmer.id = :farmerId")
    Optional<Favorite> checkFavoriteExistence(@Param("userId") int userId, @Param("farmerId") int farmerId);

    // 즐겨찾기 조회
    @Query("SELECT new com.ssafy.farmyo.user.dto.BookmarkResDto(f.id, a.nickname) FROM Favorite f LEFT JOIN fetch Farmer a ON f.farmer.id = a.id WHERE f.user.id = :userId")
    List<BookmarkResDto> getCustomerBookmarkList(int userId);

}
