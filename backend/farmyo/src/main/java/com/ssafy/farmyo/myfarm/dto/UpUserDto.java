package com.ssafy.farmyo.myfarm.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UpUserDto {

    private int job;
    private String userProfile;
    private String nickname;
    private String comment;
    private String location;
    private String locationDetail;

}
