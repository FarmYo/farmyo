package com.ssafy.farmyo.user.repository;

import com.ssafy.farmyo.entity.User;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // 로그인 아이디로 회원 조회
    Optional<User> findByLoginId(String loginId);
}
