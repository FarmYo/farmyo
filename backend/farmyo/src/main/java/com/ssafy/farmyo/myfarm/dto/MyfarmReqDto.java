package com.ssafy.farmyo.myfarm.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class MyfarmReqDto {

    String nickname;
    LocalDateTime updatedAt;
    String farmContent;
    List<MyfarmImageDto> myfarmImageDtoList;

}
