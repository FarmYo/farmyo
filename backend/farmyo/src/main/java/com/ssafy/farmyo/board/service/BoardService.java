package com.ssafy.farmyo.board.service;

import com.ssafy.farmyo.board.dto.AddBuyBoardReqDto;
import com.ssafy.farmyo.board.dto.AddFarmerBoardReqDto;
import com.ssafy.farmyo.board.dto.BoardDetailResDto;

public interface BoardService {

    //삼요게시물 작성
    Integer addBuyerBoard(AddBuyBoardReqDto addBuyBoardReqDto, int userId);

    //팜요게시물 작성
    Integer addFarmerBoard(AddFarmerBoardReqDto addFarmerBoardReqDto, int farmerId);

    //게시글 상세조회
    BoardDetailResDto getBoardDetail(int boardId);
}
