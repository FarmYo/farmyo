package com.ssafy.farmyo.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
@Getter
public enum ExceptionType {

    // 에러 열거

    // 회원
    USER_NOT_EXIST(HttpStatus.UNAUTHORIZED, "U-001", "존재하지 않는 회원입니다."),

    // 토큰
    TOKEN_NOT_EXIST(HttpStatus.UNAUTHORIZED, "T-001", "토큰이 존재하지 않습니다."),
    INVALID_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "T-002", "유효하지 않은 리프레시 토큰입니다."),
    EXPIRED_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "T-003", "만료된 리프레시 토큰입니다."),

    USER_LOGIN_REQUIRED(HttpStatus.UNAUTHORIZED, "U-001", "로그인이 필요합니다."),

    // 거래
    TRADE_NOT_EXIST(HttpStatus.UNAUTHORIZED, "T-001", "존재하지 않는 거래입니다."),

    // 계좌
    ACCOUNT_NOT_EXIST(HttpStatus.UNAUTHORIZED, "A-001", "해당 유저의 계좌가 존재하지 않습니다.");

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
