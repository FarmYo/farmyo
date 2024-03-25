package com.ssafy.farmyo.user.service;

import com.ssafy.farmyo.user.dto.JoinReqDto;
import com.ssafy.farmyo.user.dto.PasswordResetDto;
import com.ssafy.farmyo.user.dto.UserResDto;

public interface UserService {
    // 소비자 회원 가입
    int customerJoin(JoinReqDto joinReqDto);

    // 생산자 회원 가입
    int farmerJoin(JoinReqDto joinReqDto);

    // 아이디 중복 검사
    int checkIdDuplicate(String id);

    // 회원 정보 불러오기
    UserResDto getUserInfo(int id);

    // 비밀번호 초기화
    void resetPassword(PasswordResetDto passwordResetDto);
}
