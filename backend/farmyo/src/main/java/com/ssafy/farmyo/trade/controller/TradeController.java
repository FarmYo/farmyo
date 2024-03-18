package com.ssafy.farmyo.trade.controller;


import com.ssafy.farmyo.trade.service.TradeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Slf4j
@RestController
@RequestMapping("/trade")
@RequiredArgsConstructor
@Tag(name = "TradeController", description = "거래 관련 api")
public class TradeController {

    private final TradeService tradeService;

    @PostMapping("/")
    public ResponseEntity<?> createTrade() {
//        Map<Object, String> resultMap = new HashMap<>();


        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
