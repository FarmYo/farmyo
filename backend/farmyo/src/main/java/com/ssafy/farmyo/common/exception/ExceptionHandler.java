package com.ssafy.farmyo.common.exception;

import com.ssafy.farmyo.common.response.BaseResponseBody;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@Slf4j
@RestControllerAdvice
public class ExceptionHandler {

    @org.springframework.web.bind.annotation.ExceptionHandler(CustomException.class)
    public ResponseEntity<? extends BaseResponseBody> exceptions(CustomException e) {

        log.info("핸들러 입장!!");

        // 정의한 에러 코드 및 메시지 적용
        BaseResponseBody errorResponse = BaseResponseBody.error(e.getExceptionType().getErrorCode(), e.getMessage());
        return ResponseEntity.status(e.getExceptionType().getHttpStatus()).body(errorResponse);
    }
}
