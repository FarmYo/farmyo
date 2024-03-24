package com.ssafy.farmyo.user.service;

import com.ssafy.farmyo.user.dto.JoinReqDto;

public interface UserService {
    // 소비자 회원 가입
    int customerJoin(JoinReqDto joinReqDto);

    // 생산자 회원 가입
    int farmerJoin(JoinReqDto joinReqDto);

    // 아이디 중복 검사
    int checkIdDuplicate(String id);
}
