package com.ssafy.farmyo.board.service;

import com.ssafy.farmyo.board.dto.AddBuyBoardReqDto;
import com.ssafy.farmyo.board.dto.BoardDetailResDto;
import com.ssafy.farmyo.board.repository.BoardRepository;
import com.ssafy.farmyo.common.auth.CustomUserDetails;
import com.ssafy.farmyo.common.exception.CustomException;
import com.ssafy.farmyo.common.exception.ExceptionType;
import com.ssafy.farmyo.crop.repository.CropCategoryRepository;
import com.ssafy.farmyo.entity.Board;
import com.ssafy.farmyo.entity.BoardImg;
import com.ssafy.farmyo.entity.CropCategory;
import com.ssafy.farmyo.entity.User;
import com.ssafy.farmyo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final CropCategoryRepository cropCategoryRepository;
    private final UserRepository userRepository;

    //삼요 게시글 작성

    @Override
    public Integer addBuyerBoard(AddBuyBoardReqDto addBuyBoardReqDto, int userId) {

        //현재 토큰으로 불러진 유저가 있는지
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ExceptionType.USER_NOT_EXIST));

        //작물 카테고리 조회
        CropCategory cropCategory = cropCategoryRepository.findById(addBuyBoardReqDto.getCropCategoryId())
                .orElseThrow(() -> new CustomException(ExceptionType.CATEGORY_NOT_EXIST));

        Board board = Board.builder()
                .user(user)
                .cropCategory(cropCategory)
                .boardType(1)
                .boardTitle(addBuyBoardReqDto.getTitle())
                .boardContent(addBuyBoardReqDto.getContent())
                .boardQuantity(addBuyBoardReqDto.getQuantity())
                .boardPrice(addBuyBoardReqDto.getPrice())
                .build();
        board = boardRepository.save(board);
        return board.getId();
    }


    //게시글 상세 조회
    @Override
    @Transactional(readOnly = true)
    public BoardDetailResDto getBoardDetail(int boardId) {
        Board board = boardRepository.findWithDetailsById(boardId)
                .orElseThrow(() -> new CustomException(ExceptionType.BOARD_NOT_EXIST));

        //카테고리있는지 확인
        if (board.getCropCategory() == null) {
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
