package com.ssafy.farmyo.common.exception;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {

    private ExceptionType exceptionType;

    public CustomException(ExceptionType exceptionType){
        super(exceptionType.getMessage()); // 메세지를 오버라이딩 ???
        this.exceptionType = exceptionType;
    }
}
