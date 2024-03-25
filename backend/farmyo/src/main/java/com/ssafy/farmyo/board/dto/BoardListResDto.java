package com.ssafy.farmyo.board.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BoardListResDto {
    //게시판타입
    private int boardType;
    //게시판식별id
    private int boardId;
    //게시판제목
    private String title;
    //게시판 수량
    private int quantity;
    //게시판 가격
    private int price;
    //작성자식별id
    private int userId;
    //작성자닉네임
    private String userNickname;
    //작물 카테고리 이름
    private String cropCategory;
    //작물대표사진
    private String imgUrl;

}
