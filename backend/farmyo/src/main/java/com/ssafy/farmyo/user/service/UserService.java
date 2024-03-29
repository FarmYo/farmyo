package com.ssafy.farmyo.user.service;

import com.ssafy.farmyo.user.dto.*;

import java.util.List;

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

    // 비밀번호 수정
    void updatePassword(int id, PasswordUpdateDto passwordUpdateDto);

    // 회원 수정
    void modifyUserInfo(int id, UserModifyDto userModifyDto);

    // 회원 탈퇴
    void deactivateUser(int id);

    // 즐겨찾기 추가
    void addBookmark(int userId, String farmerId);

    // 즐겨찾기 조회
    List<BookmarkResDto> getBookmarkList(int userId);

    // 즐겨찾기 삭제
    void removeBookmark(int userId, int farmerId);

}
