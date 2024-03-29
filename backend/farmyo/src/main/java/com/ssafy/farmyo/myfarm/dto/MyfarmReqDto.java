package com.ssafy.farmyo.myfarm.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class MyfarmReqDto {

    String loginId;
    String farmContent;
    List<MyfarmImageDto> myfarmImageDtoList;

}
