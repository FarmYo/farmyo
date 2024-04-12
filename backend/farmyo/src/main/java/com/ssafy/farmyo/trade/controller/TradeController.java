package com.ssafy.farmyo.trade.controller;

import com.ssafy.farmyo.common.response.BaseResponseBody;
import com.ssafy.farmyo.trade.dto.*;
import com.ssafy.farmyo.trade.service.TradeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/trades")
@RequiredArgsConstructor
@Tag(name = "2. Trade", description = "Trade API")
public class TradeController {

    private final TradeService tradeService;

    @PostMapping("")
    @Operation(summary = "거래 생성하기", description = "chat 또는 board를 통해서 얻은 정보로 거래를 생성한다.")
    public ResponseEntity<? extends BaseResponseBody> createTrade(
//            @RequestParam(name = "tradeReqDto")
            @RequestBody
            @Parameter(description = "거래 생성을 위한 dto 정보 입력")
            TradeReqDto tradeReqDto) {
        log.info("{} : createTrade 실행", tradeReqDto);

        tradeService.createTrade(tradeReqDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(0, "sucess"));
    }

    @GetMapping("/list")
    @Operation(summary = "유저별 거래 목록 조회", description = "유저 id를 통해 해당 유저의 거래 목록을 조회한다.")
    public ResponseEntity<? extends BaseResponseBody> getTradeList(
            @RequestParam(name = "id")
            @Parameter(description = "거래 목록을 조회할 유저의 아이디")
            int id,
            @RequestParam(value = "page", defaultValue = "0")
            @Parameter(description = "페이지")
            int page,
            @RequestParam(value = "size", defaultValue = "10")
            @Parameter(description = "사이즈")
            int size) {
        log.info("{} : getTradeList 실행", id);

        TradeListReqDto tradeListReqDto = tradeService.getTrades(id, page, size);

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, tradeListReqDto));
    }

    @GetMapping("/detail/{id}")
    @Operation(summary = "상세 거래 조회", description = "거래 id를 받아 상세 거래 페이지를 조회한다.")
    public ResponseEntity<? extends BaseResponseBody> getTrade(
            @PathVariable(name = "id")
            @Parameter(description = "상세 거래 조회를 위한 거래 아이디")
            int id) {
        log.info("{} : getTrade 실행", id);

        TradeResDto tradeResDto = tradeService.getTrade(id);

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, tradeResDto));
    }

    @PatchMapping("/location/{id}")
    @Operation(summary = "신규주소등록", description = "주소를 새로 받아 거래 테이블에 추가한다.")
    public ResponseEntity<? extends BaseResponseBody> updateTradeLocation(
            @PathVariable(name = "id")
            @Parameter(description = "거래 아이디")
            int id,
            @RequestBody
            @Parameter(description = "주소")
            TradeLocationDto tradeLocationDto
    ) {
        log.info("{}, {} : updateTradeLocation 실행", id, tradeLocationDto);

        tradeService.updateTradeLocation(id, tradeLocationDto);

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, "sucess"));
    }

    @PatchMapping("/originalLocation/{id}")
    @Operation(summary = "기존주소등록", description = "유저 아이디를 받아 기본 주소를 찾은 후 거래 테이블에 추가한다.")
    public ResponseEntity<? extends BaseResponseBody> updateTradeOriginalLocation(
            @PathVariable(name = "id")
            @Parameter(description = "거래 아이디")
            int id,
            @RequestParam(name ="userId")
            @Parameter(description = "유저 아이디")
            int userId
    ) {
        log.info("{}, {} : updateTradeLocation 실행", id, userId);

        TradeLocationDto tradeLocationDto = tradeService.updateTradeOriginalLocation(id, userId);

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, tradeLocationDto));
    }

    @PatchMapping("/deposit/{id}")
    @Operation(summary = "거래 입금완료", description = "입금대기중이던 상태를 입금완료 상태로 변경하고 입금 테이블이 생성된다.")
    public ResponseEntity<? extends BaseResponseBody> updateTradeDeposit(
            @PathVariable(name = "id")
            @Parameter(description = "거래 아이디")
            int id,
            @RequestParam(name = "depositName")
            @Parameter(description = "입금자")
            String depositName) {
        log.info("{}, {} : updateTradeDeposit 실행" , id, depositName);

        tradeService.updateTradeDeposit(id, depositName);

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, "sucess"));
    }

    @PatchMapping("/deal/{id}")
    @Operation(summary = "거래 거래중", description = "입금완료이던 상태를 거래중 상태로 변경하고 택배사와 송장번호 컬럼을 추가한다.")
    public ResponseEntity<? extends BaseResponseBody> updateTradeDeal(
            @PathVariable(name = "id")
            @Parameter(description = "거래 아이디")
            int id,
            @RequestBody
            TradeShipDto tradeShipDto) {
        log.info("{} : updateTradeDeal 실행" , id);

        tradeService.updateTradeDeal(id, tradeShipDto);

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0 , "sucess"));
    }

    @PatchMapping("/final/{id}")
    @Operation(summary = "거래 거래완료", description = "거래중 상태를 거래완료 상태로 변경하고 출금 테이블 생성")
    public ResponseEntity<? extends BaseResponseBody> updateTradeFinish(
            @PathVariable(name = "id")
            @Parameter(description = "거래 아이디")
            int id) {
        log.info("{} : updateTradeFinish 실행" , id);

        tradeService.updateTradeFinish(id);

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, "sucess"));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "거래 삭제(거래 취소)", description = "거래 아이디를 통해 입금대기중일 때 거래를 취소한다.")
    public ResponseEntity<? extends BaseResponseBody> deleteTrade(
            @PathVariable(name = "id")
            @Parameter(description = "거래 아이디")
            int id) {
        log.info("{} : deleteTrade 실행", id);

        tradeService.deleteTrade(id);

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, "sucess"));
    }

}

