package com.ssafy.farmyo.common.exception;

import com.ssafy.farmyo.common.response.BaseResponseBody;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
@Slf4j
public class ExceptionHandler extends ResponseEntityExceptionHandler {
    @org.springframework.web.bind.annotation.ExceptionHandler(CustomException.class)
    public ResponseEntity<? extends BaseResponseBody> exceptions(CustomException e) {

        // 정의한 에러 코드 및 메시지 적용
        BaseResponseBody errorResponse = BaseResponseBody.error(e.getExceptionType().getErrorCode(), e.getMessage());
        return ResponseEntity.status(e.getExceptionType().getHttpStatus()).body(errorResponse);
    }

    // Security Error Handler
    @org.springframework.web.bind.annotation.ExceptionHandler({ AuthenticationException.class })
    public ResponseEntity<? extends BaseResponseBody> handleAuthenticationException(Exception e) {

        log.info("handleAuthenticationException");

        // 정의한 에러 코드 및 메시지 적용
        BaseResponseBody errorResponse = BaseResponseBody.error("SecurityError", e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }
}