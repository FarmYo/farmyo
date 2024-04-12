package com.ssafy.farmyo.user.controller;

import com.ssafy.farmyo.common.response.BaseResponseBody;
import com.ssafy.farmyo.user.service.RefreshService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/refresh")
@RequiredArgsConstructor
@Slf4j
public class RefreshController {

    private final RefreshService refreshService;
    @PostMapping("/reissue")
    public ResponseEntity<? extends BaseResponseBody> reissue(HttpServletRequest request, HttpServletResponse response) {

        log.info("토큰 재발급");
        refreshService.reissue(request, response);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
