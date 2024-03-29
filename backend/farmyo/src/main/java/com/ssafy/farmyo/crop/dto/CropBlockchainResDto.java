package com.ssafy.farmyo.crop.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class CropBlockchainResDto {
    private int type; //1이 농약 사용정보 2가 대회 정보 등록

    private LocalDate eventDate;
    //타입 1일 떄 들어올 변수들
    private String pesticideName;
    private String pesticideType;
    //타입 2일 때 들어올 변수들
    private String contestName;
    private String awardDetails;


}
