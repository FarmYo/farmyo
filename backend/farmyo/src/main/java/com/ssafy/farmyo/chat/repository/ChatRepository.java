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
    // 해당 유저가 포함된 채팅방 목록을 가져온다.
//    List<Chat> findByUserId(int userId);

}