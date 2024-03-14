package com.ssafy.farmyo.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
@Getter
public enum ExceptionType {

    // 에러 열거

    // 회원
    USER_NOT_EXIST(HttpStatus.UNAUTHORIZED, "U-001", "존재하지 않는 회원입니다.");

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
