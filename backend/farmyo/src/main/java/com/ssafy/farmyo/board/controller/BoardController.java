package com.ssafy.farmyo.board.controller;

import com.ssafy.farmyo.board.dto.BoardDetailResDto;
import com.ssafy.farmyo.board.repository.BoardRepository;
import com.ssafy.farmyo.board.service.BoardService;
import com.ssafy.farmyo.common.response.BaseResponseBody;
import com.ssafy.farmyo.crop.dto.CropListResDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/boards")
@RequiredArgsConstructor
@Validated
@Slf4j
@Tag(name = "4.Board", description = "BOARD API")
public class BoardController {

    private final BoardService boardService;

    //게시물 상세조회
    @Operation(summary = "게시물상세조회", description = "/boards/{boardId}\n\n 게시물 상세내용 조회")
    @GetMapping("/{boardId}")
    @ApiResponse(responseCode = "200", description = "성공 \n\n Success 반환")
    public ResponseEntity<? extends BaseResponseBody> getBoardDetail(@PathVariable int boardId) {
        BoardDetailResDto boardDetailResDto = boardService.getBoardDetail(boardId);
        log.info("게시물 상세조회 API 호출 - 게시물 ID: {}", boardId);

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, boardDetailResDto));

    }
}
