package com.ssafy.farmyo.board.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AddBuyBoardReqDto {

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
    @Min(value = 1, message = "수량은 0보다 커야합니다.")
    private int quantity;
    //가격
    @Min(value = 1, message = "가격은 0보다 커야합니다.")
    private int price;

}
