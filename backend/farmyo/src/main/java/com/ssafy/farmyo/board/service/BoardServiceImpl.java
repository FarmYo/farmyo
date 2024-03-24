package com.ssafy.farmyo.board.service;

import com.ssafy.farmyo.board.dto.BoardDetailResDto;
import com.ssafy.farmyo.board.repository.BoardRepository;
import com.ssafy.farmyo.common.exception.CustomException;
import com.ssafy.farmyo.common.exception.ExceptionType;
import com.ssafy.farmyo.entity.Board;
import com.ssafy.farmyo.entity.BoardImg;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements  BoardService {

    private final BoardRepository boardRepository;


    //게시글 상세 조회
    @Override
    @Transactional(readOnly = true)
    public BoardDetailResDto getBoardDetail(int boardId) {
        Board board = boardRepository.findWithDetailsById(boardId)
                .orElseThrow(() -> new CustomException(ExceptionType.BOARD_NOT_EXIST));

        //카테고리있는지 확인
        if (board.getCropCategory() == null){
            throw new CustomException(ExceptionType.CROPCATEGORY_NOT_ASSOCIATED_WITH_BOARD);
        }

        List<String> imgUrls = new ArrayList<>();
        // boardType이 0일 경우에만(팜요게시판) 연결된 작물이 있는지 + 이미지 URL 목록을 설정
        if (board.getBoardType() == 0) {

            if (board.getCrop() == null) {
                throw new CustomException(ExceptionType.CROP_NOT_ASSOCIATED_WITH_BOARD);
            }
            imgUrls = board.getBoardImgList().stream()
                    .map(BoardImg::getImgUrl)
                    .toList();
        }
        return BoardDetailResDto.builder()
                .id(board.getId())
                .userId(board.getUser().getId())
                .userNickname(board.getUser().getNickname())
                .cropId(board.getCrop().getId())
                .cropCategory(board.getCropCategory().getCategoryName())
                .boardTitle(board.getBoardTitle())
                .boardContent(board.getBoardContent())
                .boardQuantity(board.getBoardQuantity())
                .boardPrice(board.getBoardPrice())
                .boardImgUrls(imgUrls)
                .createdAt(board.getCreatedAt())
                .updatedAt(board.getUpdatedAt())
                .build();
    }



}
