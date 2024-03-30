package com.ssafy.farmyo.board.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class BoardDetailResDto {
    //게시판Id
    private int id;
    //작성자Id
    private int userId;
    //작성자닉네임
    private String userNickname;
    //작성자 로그인id
    private String userLoginId;
    //작물Id
    private Integer cropId;
    //작물카테고리이름
    private String cropCategory;
    //게시판 타입
    //  private int boardType;

    //게시판 제목
    private String title;
    //게시판 내용
    private String content;
    //게시판 수량
    private int quantity;
    //게시판 가격
    private int price;
    //게시판 이미지링크들
    private List<String> boardImgUrls;
    //게시판 생성시간
    private LocalDateTime createdAt;
    //게시판 수정시간
    private LocalDateTime updatedAt;

}
