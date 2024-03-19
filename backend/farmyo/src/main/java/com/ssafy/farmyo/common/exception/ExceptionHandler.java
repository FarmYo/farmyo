package com.ssafy.farmyo.common.exception;

import com.ssafy.farmyo.common.response.BaseResponseBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandler {
    @org.springframework.web.bind.annotation.ExceptionHandler(CustomException.class)
    public ResponseEntity<? extends BaseResponseBody> exceptions(CustomException e) {

        // 정의한 에러 코드 및 메시지 적용
        BaseResponseBody errorResponse = BaseResponseBody.error(e.getExceptionType().getErrorCode(), e.getMessage());
        return ResponseEntity.status(e.getExceptionType().getHttpStatus()).body(errorResponse);
    }
}
