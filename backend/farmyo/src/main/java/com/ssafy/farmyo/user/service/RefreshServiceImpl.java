package com.ssafy.farmyo.user.service;

import com.ssafy.farmyo.common.exception.CustomException;
import com.ssafy.farmyo.common.exception.ExceptionType;
import com.ssafy.farmyo.common.jwt.JWTUtil;
import com.ssafy.farmyo.common.redis.RefreshToken;
import com.ssafy.farmyo.common.redis.RefreshTokenRepository;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Slf4j
@Service
@RequiredArgsConstructor
public class RefreshServiceImpl implements RefreshService{

    private final JWTUtil jwtUtil;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public void reissue(HttpServletRequest request, HttpServletResponse response) {

        // 리프레시 토큰 찾기
        String refresh = null;

        Cookie[] cookies = request.getCookies();

        // 리프레시 토큰이 담긴 쿠키가 없을 시 에외 발생
        if(cookies == null) throw new CustomException(ExceptionType.TOKEN_NOT_EXIST);

        System.out.println(Arrays.toString(cookies));
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("refresh")) {
                refresh = cookie.getValue();
                break;
            }
        }

        // 리프레시 토큰이 없다면 예외 처리
        if (refresh == null) throw new CustomException(ExceptionType.TOKEN_NOT_EXIST);

        //expired check
        try {
            jwtUtil.isExpired(refresh);
        } catch (ExpiredJwtException e) {
            throw new CustomException(ExceptionType.EXPIRED_REFRESH_TOKEN);
        }

        // 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
        String category = jwtUtil.getCategory(refresh);
        if (!category.equals("refresh")) throw new CustomException(ExceptionType.INVALID_REFRESH_TOKEN);

        // Redis DB에 해당 리프레시토큰 조회
        if(refreshTokenRepository.findByRefreshToken(refresh).isEmpty()) throw new CustomException(ExceptionType.INVALID_REFRESH_TOKEN);

        // 토큰에서 정보 가져오기
        String loginId = jwtUtil.getLoginId(refresh);
        String nickname = jwtUtil.getNickname(refresh);
        Integer id = jwtUtil.getUserId(refresh);
        Integer job = jwtUtil.getUserJob(refresh);

        // 토큰 생성
        String newAccess = jwtUtil.createJwt("access", loginId, nickname, id, job, 86400000L);
        String newRefresh = jwtUtil.createJwt("refresh", loginId, nickname, id, job,  86400000L);

        //response
        response.setHeader("access", newAccess);
        response.addCookie(createCookie("refresh", newRefresh));

        // Refresh 토큰 Redis 저장
        refreshTokenRepository.save(new RefreshToken(newRefresh, loginId, newAccess));
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
