package com.ssafy.farmyo.common.auth;

import com.ssafy.farmyo.common.jwt.JWTUtil;
import com.ssafy.farmyo.entity.User;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        log.info("Enter JWTFilter");

        // Header 에서 access 토큰 꺼냄
        String accessToken = request.getHeader("access");

        // 토큰이 없다면 다음 필터로 넘김
        if(accessToken == null){
            log.info("토큰 없어서 다음 필터로 넘어감");
            filterChain.doFilter(request, response);
            return;
        }

        // 토큰 만료 여부 확인, 만료시 다음 필터로 넘기지 않음
        try{
            jwtUtil.isExpired(accessToken);
        }catch (ExpiredJwtException e){
//            log.info("Access Token is Expired");
//            // response body
//            PrintWriter writer = response.getWriter();
//            writer.print("만료된 Access 토큰입니다.");
//
//            // response status code
//            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//            return;
        }

        // 토큰이 access 인지 확인 (발급시 페이로드에 명시)
        String category = jwtUtil.getCategory(accessToken);
        if(!category.equals("access")){
            log.info("Invalid Access Token");
//            // response body
//            PrintWriter writer = response.getWriter();
//            writer.print("유효하지 않은 토큰입니다.");
//
//            // response status code
//            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//            return;
        }

        String loginId = jwtUtil.getLoginId(accessToken);
        String nickname = jwtUtil.getNickname(accessToken);
        int userID = jwtUtil.getUserId(accessToken);
        int userJob = jwtUtil.getUserJob(accessToken);

        User user = User.builder()
                .id(userID)
                .job(userJob)
                .loginId(loginId)
                .nickname(nickname)
                .build();

        CustomUserDetails customUserDetails = new CustomUserDetails(user);

        Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}
