package com.ssafy.farmyo.board.service;

import com.ssafy.farmyo.board.dto.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BoardService {

    //삼요게시물 작성
    Integer addBuyerBoard(AddBuyBoardReqDto addBuyBoardReqDto, int userId);

    //팜요게시물 작성
    Integer addFarmerBoard(AddFarmerBoardReqDto addFarmerBoardReqDto, List<MultipartFile> images, int farmerId);

    //게시글 상세조회
    BoardDetailResDto getBoardDetail(int boardId);

    //게시글 목록조회
    List<BoardListResDto> findBoardListByType(int boardType, int page, int size);

    //게시판 수정
    Integer patchBoard(int boardId, PatchBoardReqDto patchBoardReqDto, int userId);

}
