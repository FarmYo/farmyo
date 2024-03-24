package com.ssafy.farmyo.board.service;

import com.ssafy.farmyo.board.dto.AddBuyBoardReqDto;
import com.ssafy.farmyo.board.dto.BoardDetailResDto;
import com.ssafy.farmyo.entity.Board;
import org.springframework.security.core.Authentication;

public interface BoardService {

    //삼요게시물 작성
    Integer addBuyerBoard(AddBuyBoardReqDto addBuyBoardReqDto, int userId);

    //게시글 상세조회
    BoardDetailResDto getBoardDetail(int boardId);
}
