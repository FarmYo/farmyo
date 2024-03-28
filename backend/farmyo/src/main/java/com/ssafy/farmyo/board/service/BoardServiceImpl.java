package com.ssafy.farmyo.board.service;

import com.ssafy.farmyo.board.dto.*;
import com.ssafy.farmyo.board.repository.BoardImgRepository;
import com.ssafy.farmyo.board.repository.BoardRepository;
import com.ssafy.farmyo.common.exception.CustomException;
import com.ssafy.farmyo.common.exception.ExceptionType;
import com.ssafy.farmyo.common.s3.AwsS3Service;
import com.ssafy.farmyo.crop.repository.CropCategoryRepository;
import com.ssafy.farmyo.crop.repository.CropRepository;
import com.ssafy.farmyo.entity.*;
import com.ssafy.farmyo.user.repository.FarmerRepository;
import com.ssafy.farmyo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final CropCategoryRepository cropCategoryRepository;
    private final UserRepository userRepository;
    private final FarmerRepository farmerRepository;
    private final CropRepository cropRepository;
    private final AwsS3Service awsS3Service;
    private final BoardImgRepository boardImgRepository;


    //삼요 게시글 작성

    @Override
    @Transactional
    public Integer addBuyerBoard(AddBuyBoardReqDto addBuyBoardReqDto, int userId) {

        //현재 토큰으로 꺼내온 유저가 있는지 확인
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ExceptionType.USER_NOT_EXIST));

        //작물 카테고리 조회
        CropCategory cropCategory = cropCategoryRepository.findById(addBuyBoardReqDto.getCropCategoryId())
                .orElseThrow(() -> new CustomException(ExceptionType.CATEGORY_NOT_EXIST));
        //거래량이 0초과인지 확인
        if (addBuyBoardReqDto.getQuantity() <= 0) {
            throw new CustomException(ExceptionType.QUANTITY_INVALID);
        }

        //가격이 0초과인지 확인
        if (addBuyBoardReqDto.getPrice() <= 0) {
            throw new CustomException(ExceptionType.PRICE_INVALID);
        }

        //게시글 제목이 있는지 확인
        if (addBuyBoardReqDto.getTitle().isBlank()) {
            throw new CustomException(ExceptionType.TITLE_NOT_EXIST);
        }

        //게시글 본문이 있는지 확인
        if (addBuyBoardReqDto.getContent().isBlank()) {
            throw new CustomException(ExceptionType.CONTENT_NOT_EXIST);
        }

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

    //팜요 게시글 작성
    @Override
    @Transactional
    public Integer addFarmerBoard(AddFarmerBoardReqDto addFarmerBoardReqDto, List<MultipartFile> images ,int farmerId) {

        //현재 토큰으로 꺼내온 농부가 있는지 확인
        Farmer farmer = farmerRepository.findById(farmerId)
                .orElseThrow(() -> new CustomException(ExceptionType.USER_NOT_EXIST));

        //입력받은 작물id 조회
        Crop crop = cropRepository.findById(addFarmerBoardReqDto.getCropId())
                .orElseThrow(() -> new CustomException(ExceptionType.CROP_NOT_EXIST));

        //해당 작물로 이미 게시판이 있는지 확인
        Optional<Board> optionalBoard = boardRepository.findByCropId(crop.getId());
        if (optionalBoard.isPresent()) {
            throw new CustomException(ExceptionType.BOARD_ALREADY_EXISTS);
        }

        //작물이 본인 것이 맞는 지 조회
        if (!crop.getFarmer().getId().equals(farmerId)) {
            throw new CustomException(ExceptionType.CROP_NOT_OWNED_BY_FARMER);
        }

        //작물id에서 작물카테고리 조회
        if (crop.getCropCategory() == null) {
            throw new CustomException(ExceptionType.CATEGORY_NOT_EXIST);
        }
        //거래량이 0초과인지 확인
        if (addFarmerBoardReqDto.getQuantity() <= 0) {
            throw new CustomException(ExceptionType.QUANTITY_INVALID);
        }

        //가격이 0초과인지 확인
        if (addFarmerBoardReqDto.getPrice() <= 0) {
            throw new CustomException(ExceptionType.PRICE_INVALID);
        }


        //게시글 제목이 있는지 확인
        if (addFarmerBoardReqDto.getTitle().isBlank()) {
            throw new CustomException(ExceptionType.TITLE_NOT_EXIST);
        }

        //게시글 본문이 있는지 확인
        if (addFarmerBoardReqDto.getContent().isBlank()) {
            throw new CustomException(ExceptionType.CONTENT_NOT_EXIST);
        }


        CropCategory cropCategory = crop.getCropCategory();


        //이미지 처리하기 나중에


        Board board = Board.builder()
                .user(farmer)
                .crop(crop)
                .cropCategory(cropCategory)
                .boardType(0)
                .boardTitle(addFarmerBoardReqDto.getTitle())
                .boardContent(addFarmerBoardReqDto.getContent())
                .boardQuantity(addFarmerBoardReqDto.getQuantity())
                .boardPrice(addFarmerBoardReqDto.getPrice())
                .build();

        board = boardRepository.save(board);

        //BoardImg넣을곳
        List<BoardImg> boardImages = new ArrayList<>();
        System.out.println("images = " + images);

        if (images != null && !images.isEmpty()) {
            for (int i = 0; i < images.size(); i++) {
                MultipartFile imgFile = images.get(i);

                //파일저장
                String imgUrl = awsS3Service.uploadFile(imgFile);

                BoardImg boardImg = BoardImg.builder()
                        .board(board)
                        .imgOrder(i+1)
                        .imgUrl(imgUrl)
                        .build();
                boardImages.add(boardImg);
            }

        }

        if (!boardImages.isEmpty()) {
            boardImgRepository.saveAll(boardImages);
        }


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
                .userLoginId(board.getUser().getLoginId())
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


    //게시글 목록 조회
    @Override
    @Transactional(readOnly = true)
    public List<BoardListResDto> findBoardListByType(int boardType, int page, int size) {
        if (!(boardType <= 1)) {
            throw new CustomException(ExceptionType.BOARDTYPE_INVALID);
        }
        Page<Board> boards = boardRepository.getArticleList(boardType, PageRequest.of(page, size));
        return boards.stream().map(board -> {
            String imgUrl = null;
            if (boardType == 0 && Optional.ofNullable(board.getCrop()).map(Crop::getCropImgUrl).isPresent()) {
                imgUrl = board.getCrop().getCropImgUrl();
            }
            return BoardListResDto.builder()
                    .boardId(board.getId())
                    .boardType(boardType)
                    .title(board.getBoardTitle())
                    .quantity(board.getBoardQuantity())
                    .price(board.getBoardPrice())
                    .userId(board.getUser().getId())
                    .userNickname(board.getUser().getNickname())
                    .cropCategory(board.getCropCategory().getCategoryName())
                    .imgUrl(imgUrl)
                    .build();
        }).collect(Collectors.toList());
    }

    //게시판 수정
    @Override
    @Transactional
    public Integer patchBoard(int boardId, PatchBoardReqDto patchBoardReqDto, int userId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new CustomException(ExceptionType.BOARD_NOT_EXIST));
        //게시글작성자랑 접속 유저가 다르면
        if (!board.getUser().getId().equals(userId)) {
            throw new CustomException(ExceptionType.USER_NOT_AUTHOR);
        }
        //거래량이 0초과인지 확인
        if (patchBoardReqDto.getQuantity() <= 0) {
            throw new CustomException(ExceptionType.QUANTITY_INVALID);
        }

        //가격이 0초과인지 확인
        if (patchBoardReqDto.getPrice() <= 0) {
            throw new CustomException(ExceptionType.PRICE_INVALID);
        }


        //게시글 제목이 있는지 확인
        if (patchBoardReqDto.getTitle().isBlank()) {
            throw new CustomException(ExceptionType.TITLE_NOT_EXIST);
        }

        //게시글 본문이 있는지 확인
        if (patchBoardReqDto.getContent().isBlank()) {
            throw new CustomException(ExceptionType.CONTENT_NOT_EXIST);
        }
        board.patchBoard(patchBoardReqDto.getQuantity(), patchBoardReqDto.getPrice(), patchBoardReqDto.getTitle(), patchBoardReqDto.getContent());

//        팜요게시글일 경우 사진수정 나중에 s3되고 구현
//        if (board.getBoardType() == 0) {
//            //요청에 이미지가 있을때만
//            if (patchBoardReqDto.getImages() != null) {
//
//            }
//        }
        board = boardRepository.save(board);
        return board.getId();
    }



}
