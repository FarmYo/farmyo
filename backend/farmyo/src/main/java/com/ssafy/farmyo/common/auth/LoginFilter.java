package com.ssafy.farmyo.common.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.farmyo.common.jwt.JWTUtil;
import com.ssafy.farmyo.common.redis.RefreshToken;
import com.ssafy.farmyo.common.redis.RefreshTokenRepository;
import com.ssafy.farmyo.entity.UserStatus;
import com.ssafy.farmyo.user.dto.LoginReqDto;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

@Slf4j
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final RefreshTokenRepository refreshTokenRepository;
    private ObjectMapper mapper;

    public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil, RefreshTokenRepository refreshTokenRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.refreshTokenRepository = refreshTokenRepository;
        this.setFilterProcessesUrl("/users/login");
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        log.info("Enter Login Filter");

        // Json 형식 로그인
        // LoginReqDto 변환을 위한 Mapper
        mapper = new ObjectMapper();

        // loginId, password 검증하기 위해 데이터를 담을 authToken 객체
        UsernamePasswordAuthenticationToken authToken;

        // request 내부 json 추출 후 LoginReqDto 객체 반환
        try{
            LoginReqDto dto = mapper.readValue(
                    request.getReader().lines().collect(Collectors.joining()), LoginReqDto.class);

            log.info("id : {}, pw {}", dto.getLoginId(), dto.getPassword());

            // email, password 검증하기 위해 authToken 객체에 데이터 담기
            authToken = new UsernamePasswordAuthenticationToken(dto.getLoginId(), dto.getPassword(), null);

        }catch(IOException e) {
            throw new AuthenticationServiceException("Request Content-Type is not application/json");
        }

        // Authentication 반환
        return authenticationManager.authenticate(authToken);
    }

    // 로그인 성공시 실행하는 메소드
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException {

        log.info("Login Success");

        //유저 정보
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        int id = userDetails.getId();
        String username = userDetails.getUsername();
        String nickname = userDetails.getNickname();
        int job = userDetails.getJob();
        UserStatus status = userDetails.getUserStatus();

        if(status == UserStatus.WITHDRAWN){
            String jsonResponse = "{\"dataHeader\": {\"successCode\": 1, \"resultCode\": \"U-000\", \"resultMessage\": \"회원 탈퇴한 계정입니다.\"}, \"dataBody\": null}";

            // JSON 형식으로 응답을 반환하기 위해 Content-Type 설정
            response.setContentType("application/json");
            // 상태 코드 설정
            response.setStatus(HttpStatus.BAD_REQUEST.value());

            // JSON 응답을 출력
            PrintWriter out = new PrintWriter(new OutputStreamWriter(response.getOutputStream(), StandardCharsets.UTF_8), true);
            out.print(jsonResponse);
            out.flush();

            return;
        }

        log.info("Create Token - loginId : {}, id : {}, job : {}, nickname : {}", username, id, job, nickname);

        //토큰 생성
        String access = jwtUtil.createJwt("access", username, nickname, id,  job, 86400000L);
        String refresh = jwtUtil.createJwt("refresh", username, nickname, id, job,  86400000L);

        // Refresh 토큰 Redis 저장
        refreshTokenRepository.save(new RefreshToken(refresh, username, access));

        //응답 설정
        response.setHeader("access", access);
        response.addCookie(createCookie("refresh", refresh));
        response.setStatus(HttpStatus.OK.value());
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {

        log.info("Login Failure");

        //로그인 실패시 401 응답 코드 반환
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
    }

    // 쿠키 생성 메서드
    private Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24*60*60);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setHttpOnly(true);

        return cookie;
    }
}
