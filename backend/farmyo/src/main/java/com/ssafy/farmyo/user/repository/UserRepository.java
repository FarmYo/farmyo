package com.ssafy.farmyo.user.repository;

import com.ssafy.farmyo.entity.User;
import com.ssafy.farmyo.user.dto.UserResDto;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // 로그인 아이디로 회원 조회
    Optional<User> findByLoginId(String loginId);

    // 이메일로 회원 조회
    Optional<User> findByEmail(String email);

    // 회원 정보 조회
    @Query("SELECT new com.ssafy.farmyo.user.dto.UserResDto(u.loginId, u.email, u.nickname, u.telephone, u.comment, u.account, a.addressCode, a.addressDetail, a.addressLegal) " +
            "FROM User u join Address a " +
            "ON u.id = a.user.id " +
            "WHERE u.id = :id ")
    UserResDto getUserInfoById(@Param("id") Integer id);
}
