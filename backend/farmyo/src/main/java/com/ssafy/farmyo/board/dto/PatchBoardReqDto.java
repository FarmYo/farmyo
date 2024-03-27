package com.ssafy.farmyo.board.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Builder
public class PatchBoardReqDto {

    @Min(value = 1)
    private int quantity;
    @Min(value = 1)
    private int price;
    @NotBlank
    private String title;
    @NotBlank
    private String content;
    private List<MultipartFile> images;
}
