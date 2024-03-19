package com.ssafy.farmyo.crop.controller;

import com.ssafy.farmyo.crop.service.CropService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/crop")
@RequiredArgsConstructor
@Validated
@Slf4j
@Tag(name = "CROP", description = "CROP API")
public class CropController {

    private final CropService cropService;
}
