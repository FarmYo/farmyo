package com.ssafy.farmyo.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
@Getter
public enum ExceptionType {

    // 에러 열거

    // 회원
    USER_NOT_EXIST(HttpStatus.UNAUTHORIZED, "U-001", "존재하지 않는 회원입니다."),
    USER_LOGIN_REQUIRED(HttpStatus.UNAUTHORIZED, "U-002", "로그인이 필요합니다."),
    EMAIL_NOT_EXIST(HttpStatus.BAD_REQUEST, "U-002", "존재하지 않는 이메일입니다."),
    EMAIL_EXIST(HttpStatus.BAD_REQUEST, "U-003", "이미 사용 중인 이메일입니다."),
    CODE_TIME_EXPIRED(HttpStatus.BAD_REQUEST, "U-004", "인증 시간이 초과하였습니다."),
    CODE_NOT_MATCH(HttpStatus.BAD_REQUEST, "U-005", "인증 코드가 일치하지 않습니다."),
    CODE_NOT_EXIST(HttpStatus.BAD_REQUEST, "U-006", "인증 코드가 유효하지 않습니다."),

    // 작물
    CROP_NOT_EXIST(HttpStatus.BAD_REQUEST, "C-001", "존재하지 않는 작물입니다."),
    CATEGORY_NOT_EXIST(HttpStatus.BAD_REQUEST, "C-002", "존재하지 않는 작물 카테고리입니다."),
    USER_FARMER_REQUIRED(HttpStatus.BAD_REQUEST, "C-003", "농부만 작물 등록할 수 있습니다."),


    // 토큰
    TOKEN_NOT_EXIST(HttpStatus.UNAUTHORIZED, "T-001", "토큰이 존재하지 않습니다."),
    INVALID_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "T-002", "유효하지 않은 리프레시 토큰입니다."),
    EXPIRED_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "T-003", "만료된 리프레시 토큰입니다."),


    // 거래
    TRADE_NOT_EXIST(HttpStatus.BAD_REQUEST, "T-001", "존재하지 않는 거래입니다."),

    // 계좌
    ACCOUNT_NOT_EXIST(HttpStatus.UNAUTHORIZED, "A-001", "해당 유저의 계좌가 존재하지 않습니다."),

    // 게시판
    BOARD_NOT_EXIST(HttpStatus.BAD_REQUEST, "B-001", "존재하지 않는 게시판입니다."),
    CROP_NOT_ASSOCIATED_WITH_BOARD(HttpStatus.BAD_REQUEST, "B-002", "게시판에 연결된 작물이 존재하지 않습니다."),
    CROPCATEGORY_NOT_ASSOCIATED_WITH_BOARD(HttpStatus.BAD_REQUEST, "B-003", "판매게시판에 연결된 작물카테고리가 존재하지 않습니다."),




    // 채팅
    CHAT_NOT_EXIST(HttpStatus.BAD_REQUEST, "M-001", "존재하지 않는 채팅입니다.");

    // 상태, 에러 코드, 메시지
    private final HttpStatus httpStatus;
    private final String errorCode;
    private final String message;

    // 생성자
    ExceptionType(HttpStatus httpStatus, String errorCode, String message) {
        this.httpStatus = httpStatus;
        this.errorCode = errorCode;
        this.message = message;
    }
}
