package com.ssafy.farmyo.board.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Builder
public class AddSellBoardReqDto {
    //작물id
    @NotEmpty
    private int cropId;
    //작물카테고리id
    @NotEmpty
    private int cropCategoryId;
    //제목
    @NotBlank
    private String title;
    //내용
    @NotBlank
    private String content;
    //거래량
    @NotEmpty
    private int quantity;
    //가격
    @NotEmpty
    private int price;
    //이미지들
    private List<MultipartFile> files;


}
