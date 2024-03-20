package com.ssafy.farmyo.board.repository;

import com.ssafy.farmyo.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, String> {

    Board findById(int id);

}
