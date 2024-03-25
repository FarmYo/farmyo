package com.ssafy.farmyo.board.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Builder
public class AddFarmerBoardReqDto {
    //작물id
    @Min(value = 1)
    private int cropId;
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
    //이미지들
    private List<MultipartFile> files;


}
