package com.ssafy.farmyo.chat.repository;

import com.ssafy.farmyo.entity.Chat;
import com.ssafy.farmyo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer> {

    // 채팅 방을 ID를 기준으로 찾는다.
    Chat findById(int id);
git pu
}