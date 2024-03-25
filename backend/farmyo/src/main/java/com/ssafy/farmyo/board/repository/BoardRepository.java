package com.ssafy.farmyo.board.repository;

import com.ssafy.farmyo.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {

    //상세 조회용 (연관 엔티티 바로 불러와서 N+1문제 방지)
    @EntityGraph(attributePaths = {"user", "crop", "boardImgList","cropCategory"})
    Optional<Board> findWithDetailsById(Integer id);

    @Query("SELECT b FROM Board b WHERE b.boardType = :boardType AND b.boardQuantity > 0 ORDER BY b.updatedAt DESC")
    Page<Board> getArticleList(@Param("boardType") int boardType, Pageable pageable);


}
