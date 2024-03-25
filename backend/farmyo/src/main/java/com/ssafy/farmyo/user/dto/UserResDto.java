package com.ssafy.farmyo.user.dto;

import com.ssafy.farmyo.entity.Account;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserResDto {

    public String loginId;

    public String email;

    public String nickname;

    public String telephone;

    public String comment;

    public Account account;

    public String addressCode;

    public String addressLegal;

    public String addressDetail;
}


