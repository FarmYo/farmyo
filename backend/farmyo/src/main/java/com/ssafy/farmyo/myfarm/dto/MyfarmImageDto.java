package com.ssafy.farmyo.myfarm.dto;

import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Builder
@Getter
public class MyfarmImageDto {

    String imageUrl;
    int order;

}
