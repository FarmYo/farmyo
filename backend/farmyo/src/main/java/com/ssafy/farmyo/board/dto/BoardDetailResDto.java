package com.ssafy.farmyo.board.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
public class BoardDetailResDto {
    private int id;
    private int userId;
    private String userNickname;
    private int cropId;
    private String cropName;

    //카테고리 정보는 cropName에 있어서 필요 없을 것 같아 아직 안넣음
    private int boardType;
    private String boardTitle;
    private String boardContent;
    private int boardQuantity;
    private int boardPrice;
    private List<String> boardImgUrls;

}
