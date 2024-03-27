package com.ssafy.farmyo.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookmarkReqDto {

    // 농부 식별 아이디
    public int farmerId;

    // 농부 로그인 아이디
    public String farmerLoginId;

}
