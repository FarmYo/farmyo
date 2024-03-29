package com.ssafy.farmyo.myfarm.dto;

import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
public class MyfarmImageDto {

    MultipartFile image;
    int order;

}
