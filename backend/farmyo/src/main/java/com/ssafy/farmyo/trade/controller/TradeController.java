package com.ssafy.farmyo.trade.controller;


import com.ssafy.farmyo.common.response.BaseResponseBody;
import com.ssafy.farmyo.entity.Trade;
import com.ssafy.farmyo.trade.dto.TradeDto;
import com.ssafy.farmyo.trade.dto.TradeListReqDto;
import com.ssafy.farmyo.trade.dto.TradeReqDto;
import com.ssafy.farmyo.trade.dto.TradeResDto;
import com.ssafy.farmyo.trade.service.TradeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Slf4j
@RestController
@RequestMapping("/trade")
@RequiredArgsConstructor
@Tag(name = "2. Trade", description = "Trade API")
public class TradeController {

    private final TradeService tradeService;

    @PostMapping("/")
    @Operation(summary = "거래 생성하기", description = "chat 또는 board를 통해서 얻은 정보로 거래를 생성한다.")
    public ResponseEntity<? extends BaseResponseBody> createTrade(
            @RequestParam(name = "tradeReqDto")
            @Parameter(description = "거래 생성을 위한 dto 정보 입력")
            TradeReqDto tradeReqDto) {
        log.info("{} : createTrade 실행", tradeReqDto);

        tradeService.createTrade(tradeReqDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(0, 1));
    }


    @GetMapping("")
    @Operation(summary = "유저별 거래 목록 조회", description = "유저 id를 통해 해당 유저의 거래 목록을 조회한다.")
    public ResponseEntity<? extends BaseResponseBody> getTradeList(
            @RequestParam(name = "userId")
            @Parameter(description = "거래 목록을 조회할 유저의 아이디")
            int userId) {
        log.info("{} : getTradeList 실행", userId);

        TradeListReqDto tradeListReqDto = tradeService.getTrades(userId);

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, tradeListReqDto));
    }

    @GetMapping("/{id}")
    @Operation(summary = "상세 거래 조회", description = "거래 id를 받아 상세 거래 페이지를 조회한다.")
    public ResponseEntity<? extends BaseResponseBody> getTrade(
            @PathVariable(name = "id")
            @Parameter(description = "상세 거래 조회를 위한 거래 아이디")
            int id) {
        log.info("{} : getTrade 실행", id);

        TradeResDto tradeResDto = tradeService.getTrade(id);

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, tradeResDto));
    }

}
