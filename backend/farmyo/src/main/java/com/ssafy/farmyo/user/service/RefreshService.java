package com.ssafy.farmyo.user.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface RefreshService {

    // Access Token 만료 시 재발급 및 Refresh Rotate
    void reissue(HttpServletRequest request, HttpServletResponse response);
}
