package com.ssafy.farmyo.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BookmarkResDto {

    // 농부 식별 아이디
    public int id;

    // 농부 이름
    public String farmerName;
}
