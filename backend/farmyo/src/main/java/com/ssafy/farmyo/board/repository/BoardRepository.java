package com.ssafy.farmyo.board.repository;

import com.ssafy.farmyo.entity.Board;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository {

    Board findById(int id);

}
