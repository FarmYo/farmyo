package com.ssafy.farmyo.board.service;

import com.ssafy.farmyo.board.dto.BoardDetailResDto;

public interface BoardService {


    //게시글 상세조회
    BoardDetailResDto getBoardDetail(int boardId);
}
