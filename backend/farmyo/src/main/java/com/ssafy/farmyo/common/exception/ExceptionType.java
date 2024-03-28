package com.ssafy.farmyo.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ExceptionType {

    // 에러 열거
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "S-001", "서버 내부 오류입니다."),

    // 회원
    USER_NOT_EXIST(HttpStatus.UNAUTHORIZED, "U-001", "존재하지 않는 회원입니다."),
    USER_LOGIN_REQUIRED(HttpStatus.UNAUTHORIZED, "U-002", "로그인이 필요합니다."),
    EMAIL_NOT_EXIST(HttpStatus.BAD_REQUEST, "U-003", "존재하지 않는 이메일입니다."),
    EMAIL_EXIST(HttpStatus.BAD_REQUEST, "U-004", "이미 사용 중인 이메일입니다."),
    CODE_TIME_EXPIRED(HttpStatus.BAD_REQUEST, "U-005", "인증 시간이 초과하였습니다."),
    CODE_NOT_MATCH(HttpStatus.BAD_REQUEST, "U-006", "인증 코드가 일치하지 않습니다."),
    CODE_NOT_EXIST(HttpStatus.BAD_REQUEST, "U-007", "인증 코드가 유효하지 않습니다."),
    INVALID_BUSINESS_LICENSE(HttpStatus.BAD_REQUEST, "U-008", "유효하지 않은 사업자 등록 정보입니다."),
    DUPLICATE_BUSINESS_LICENSE(HttpStatus.BAD_REQUEST, "U-009", "중복된 사업자 등록 정보입니다."),
    LOGIN_ID_MISMATCH(HttpStatus.BAD_REQUEST, "U-010", "일치하는 회원 정보가 없습니다."),
    PASSWORD_NOT_MATCH(HttpStatus.BAD_REQUEST, "U-011", "현재 비밀번호가 일치하지 않습니다."),
    FARMER_NOT_EXIST(HttpStatus.BAD_REQUEST, "U-012", "존재하지 않는 농부입니다."),

    // 작물
    CROP_NOT_EXIST(HttpStatus.BAD_REQUEST, "C-001", "존재하지 않는 작물입니다."),
    CATEGORY_NOT_EXIST(HttpStatus.BAD_REQUEST, "C-002", "존재하지 않는 작물 카테고리입니다."),
    USER_FARMER_REQUIRED(HttpStatus.BAD_REQUEST, "C-003", "농부만 작물 등록할 수 있습니다."),
    BLOCKCHAIN_FAILED_TO_CREATE(HttpStatus.INTERNAL_SERVER_ERROR, "C-004", "블록체인 등록 중 내부 오류가 발생했습니다."),
    PesticideName_INVALID(HttpStatus.BAD_REQUEST, "C-005", "농약이름이 입력되지 않았습니다."),
    PesticideCode_INVALID(HttpStatus.BAD_REQUEST, "C-006", "농약종류가 입력되지 않았습니다."),
    ContestName_INVALID(HttpStatus.BAD_REQUEST, "C-007", "대회이름이 입력되지 않았습니다."),
    AWARDDETAILS_INVALID(HttpStatus.BAD_REQUEST, "C-008", "수상내역이 입력되지 않았습니다."),
    EVENTDATE_INVALID(HttpStatus.BAD_REQUEST, "C-009", "발생일이 입력되지 않았습니다."),
    TYPE_INVALID(HttpStatus.BAD_REQUEST, "C-010", "타입 값이 올바르지 않습니다."),



    // 토큰
    TOKEN_NOT_EXIST(HttpStatus.UNAUTHORIZED, "O-001", "토큰이 존재하지 않습니다."),
    INVALID_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "O-002", "유효하지 않은 리프레시 토큰입니다."),
    EXPIRED_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "O-003", "만료된 리프레시 토큰입니다."),


    // 거래
    TRADE_NOT_EXIST(HttpStatus.BAD_REQUEST, "T-001", "존재하지 않는 거래입니다."),
    STATUS_NOT_MATCH(HttpStatus.BAD_REQUEST, "T-002", "거래 상태가 맞지 않습니다."),

    // 계좌
    ACCOUNT_NOT_EXIST(HttpStatus.UNAUTHORIZED, "A-001", "해당 유저의 계좌가 존재하지 않습니다."),

    // 게시판
    BOARD_NOT_EXIST(HttpStatus.NOT_FOUND, "B-001", "존재하지 않는 게시판입니다."),
    CROP_NOT_ASSOCIATED_WITH_BOARD(HttpStatus.BAD_REQUEST, "B-002", "게시판에 연결된 작물이 존재하지 않습니다."),
    CROPCATEGORY_NOT_ASSOCIATED_WITH_BOARD(HttpStatus.BAD_REQUEST, "B-003", "판매게시판에 연결된 작물카테고리가 존재하지 않습니다."),
    FARMER_CANNOT_POST_BUY_BOARD(HttpStatus.FORBIDDEN, "B-004", "농부는 구매 게시판을 작성할 수 없습니다."),
    QUANTITY_INVALID(HttpStatus.BAD_REQUEST, "B-005", "게시판의 수량이 유효하지 않습니다."),
    PRICE_INVALID(HttpStatus.BAD_REQUEST, "B-006", "게시판의 가격이 유효하지 않습니다."),
    CROP_NOT_OWNED_BY_FARMER(HttpStatus.BAD_REQUEST, "B-007", "작물이 로그인한 농부의 소유가 아닙니다."),
    TITLE_NOT_EXIST(HttpStatus.BAD_REQUEST, "B-008", "글 제목이 없습니다."),
    CONTENT_NOT_EXIST(HttpStatus.BAD_REQUEST, "B-009", "글 내용이 없습니다."),
    BOARDTYPE_INVALID(HttpStatus.BAD_REQUEST, "B-010", "보드타입이 잘못되었습니다."),
    USER_NOT_AUTHOR(HttpStatus.FORBIDDEN, "B-011", "작성자만 수정 또는 삭제할 수 있습니다."),
    BOARD_ALREADY_EXISTS(HttpStatus.CONFLICT, "B-012", "이미 이 작물과 관련된 게시판이 있습니다."),




    // 채팅
    CHAT_NOT_EXIST(HttpStatus.BAD_REQUEST, "M-001", "존재하지 않는 채팅방입니다."),

    // 즐겨찾기
    ALREADY_EXIST_FAVORITE(HttpStatus.BAD_REQUEST, "F-001", "이미 존재하는 즐겨찾기 입니다."),
    NOT_EXIST_FAVORITE(HttpStatus.BAD_REQUEST, "F-002", "존재하지 않는 즐겨찾기 입니다."),
    INVALID_ACCESS_FAVORITE(HttpStatus.BAD_REQUEST, "F-003", "해당 즐겨찾기 삭제할 권한이 없습니다."),

    // 마이페이지(마이팜)
    USER_NOT_FARMER(HttpStatus.BAD_REQUEST, "P-001", "해당 유저는 농부가 아닙니다."),
    ADDRESS_NOT_EXIST(HttpStatus.BAD_REQUEST, "P-002", "해당 유저의 주소가 없습니다.");



    // 상태, 에러 코드, 메시지
    private final HttpStatus httpStatus;
    private final String errorCode;
    private final String message;

    // 생성자
    ExceptionType(HttpStatus httpStatus, String errorCode, String message) {
        this.httpStatus = httpStatus;
        this.errorCode = errorCode;
        this.message = message;
    }
}
