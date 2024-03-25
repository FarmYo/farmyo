package com.ssafy.farmyo.common.redis;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@Getter
@AllArgsConstructor
@ToString
@RedisHash(value = "refresh_token", timeToLive = 60*60*24*3)
public class RefreshToken {

    @Indexed
    private String refreshToken;

    @Id
    private String loginId;

    private String accessToken;

}
