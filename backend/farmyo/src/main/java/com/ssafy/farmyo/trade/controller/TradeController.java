package com.ssafy.farmyo.trade.controller;

import com.ssafy.farmyo.common.response.BaseResponseBody;
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

    @PutMapping("/{id}")
    @Operation(summary = "주소등록", description = "주소를 받아 거래 테이블에 추가한다.")
    public ResponseEntity<? extends BaseResponseBody> updateTradeLocation(
            @PathVariable(name = "id")
            @Parameter(description = "거래 아이디")
            int id,
            @RequestParam(name = "location")
            @Parameter(description = "주소")
            String location
    ) {
        log.info("{}, {} : updateTradeLocation 실행", id, location);

        tradeService.updateTradeLocation(id, location);

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, 0));
    }

    @PutMapping("/{id}")
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

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, 0));
    }

    @PutMapping("/{id}")
    @Operation(summary = "거래 거래중", description = "입금완료이던 상태를 거래중 상태로 변경하고 택배사와 송장번호 컬럼을 추가한다.")
    public ResponseEntity<? extends BaseResponseBody> updateTradeDeal(
            @PathVariable(name = "id")
            @Parameter(description = "거래 아이디")
            int id,
            @RequestParam(name = "tradeShipment")
            @Parameter(description = "송장번호")
            String tradeShipment,
            @RequestParam(name = "tradeShipcom")
            @Parameter(description = "택배사")
            String tradeShipcom) {
        log.info("{} : updateTradeDeal 실행" , id);

        tradeService.updateTradeDeal(id, tradeShipment, tradeShipcom);

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0 , 0));
    }

    @PutMapping("/{id}")
    @Operation(summary = "거래 거래완료", description = "거래중 상태를 거래완료 상태로 변경하고 출금 테이블 생성")
    public ResponseEntity<? extends BaseResponseBody> updateTradeFinish(
            @PathVariable(name = "id")
            @Parameter(description = "거래 아이디")
            int id) {
        log.info("{} : updateTradeFinish 실행" , id);

        tradeService.updateTradeFinish(id);

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, 0));
    }

}

