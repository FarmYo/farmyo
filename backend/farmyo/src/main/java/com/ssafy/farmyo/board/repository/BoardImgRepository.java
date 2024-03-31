package com.ssafy.farmyo.board.repository;

import com.ssafy.farmyo.entity.BoardImg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardImgRepository extends JpaRepository<BoardImg, Integer> {

    List<BoardImg> findByBoardId(Integer boardId);
}
