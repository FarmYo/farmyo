package com.ssafy.farmyo.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry){
        List<String> origins = List.of("http://localhost:3000", "https://j10d209.p.ssafy.io","http://172.30.1.74:3000");

        registry.addMapping("/**") // 모든 경로에 대해
                .allowedOrigins(String.join(",", origins)) // 허용할 오리진 지정
                .allowedMethods("*") // 메서드
                .allowCredentials(true); // 쿠키를 포함한 요청 허용
    }
}
