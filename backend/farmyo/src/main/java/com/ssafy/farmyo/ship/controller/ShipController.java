package com.ssafy.farmyo.ship.controller;

import com.ssafy.farmyo.bank.service.BankService;
import com.ssafy.farmyo.common.response.BaseResponseBody;
import com.ssafy.farmyo.ship.service.ShipService;
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
@RequestMapping("/ships")
@RequiredArgsConstructor
@Tag(name="8.SHIP", description="ship API")
public class ShipController {

    private final ShipService shipService;

    @Operation(summary = "택배회사 카테고리 조회", description = "택배회사명을 조회한다.")
    @GetMapping("")
    @ApiResponse(responseCode = "200", description = "성공 \n\n 택배회사명 리스트 반환")
    public ResponseEntity<? extends BaseResponseBody> join() {

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, shipService.getCategory()));


    }

}
