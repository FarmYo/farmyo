package com.ssafy.farmyo.user.service;

import com.ssafy.farmyo.user.dto.JoinReqDto;

public interface UserService {
    // 회원 가입
    int join(JoinReqDto joinReqDto);

    // 아이디 중복 검사
    int checkIdDuplicate(String id);
}
