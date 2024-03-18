package com.ssafy.farmyo.trade.controller;


import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/trade")
@RequiredArgsConstructor
@Tag(name = "TradeController", description = "거래 관련 api")
public class TradeController {
}
