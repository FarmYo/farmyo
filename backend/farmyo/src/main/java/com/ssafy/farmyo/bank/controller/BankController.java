package com.ssafy.farmyo.bank.controller;

import com.ssafy.farmyo.bank.service.BankService;
import com.ssafy.farmyo.common.response.BaseResponseBody;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/banks")
@RequiredArgsConstructor
@Tag(name="1.BANK", description="BANK API")
public class BankController {

    private final BankService bankService;

    @Operation(summary = "은행 카테고리 조회", description = "은행명을 조회한다.")
    @GetMapping("")
    @ApiResponse(responseCode = "200", description = "성공 \n\n 은행명 리스트 반환")
    public ResponseEntity<? extends BaseResponseBody> join() {

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(0, bankService.getCategory()));
    }

}
