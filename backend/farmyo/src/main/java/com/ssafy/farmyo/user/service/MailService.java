package com.ssafy.farmyo.user.service;

import com.ssafy.farmyo.user.dto.VerifyCodeReqDto;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.io.UnsupportedEncodingException;

public interface MailService {
    // 인증 코드 생성
    public String createAuthCode();

    // 메일 내용 생성
    public MimeMessage createMessage(String receiver, String authCode) throws MessagingException, UnsupportedEncodingException;

    // 회원가입을 위한 메일 전송
    public void sendJoinMessage(String email) throws MessagingException, UnsupportedEncodingException;

    // 비밀번호 찾기를 위한 메일 전송
    public void sendPasswordRecoveryMessage(String email) throws MessagingException, UnsupportedEncodingException;

    // 인증 코드 확인
    void validateAuthCode(VerifyCodeReqDto verifyCodeReqDto);
}
