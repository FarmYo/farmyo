package com.ssafy.farmyo.chat.repository;

import com.ssafy.farmyo.chat.dto.ChatDto;
import com.ssafy.farmyo.chat.dto.MessageListDto;
import com.ssafy.farmyo.entity.Chat;
import com.ssafy.farmyo.entity.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer> {

    // 해당 유저가 포함된 채팅방 목록을 가져온다.
    List<ChatDto> findAllBySellerId(int userId);

    List<ChatDto> findAllByBuyerId(int userId);


}