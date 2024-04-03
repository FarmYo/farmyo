package com.ssafy.farmyo.chat.repository;

import com.ssafy.farmyo.chat.dto.MessageDetailDto;
import com.ssafy.farmyo.chat.dto.MessageListDto;
import com.ssafy.farmyo.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {

    @Query("SELECT new com.ssafy.farmyo.chat.dto.MessageDetailDto(m.id, m.userId, m.content, m.createdAt) from Message m WHERE m.chat.id=:chatId ORDER BY m.createdAt DESC")
    List<MessageDetailDto> findAllById(int chatId, Pageable pageable);

    @Query("SELECT new com.ssafy.farmyo.chat.dto.MessageDetailDto(m.id, m.userId, m.content, m.createdAt) from Message m WHERE m.chat.id=:chatId AND m.id < :msgId ORDER BY m.createdAt DESC")
    List<MessageDetailDto> findAllById(int chatId, int msgId, Pageable pageable);

    @Query("select count(*) from Message m where m.chat.id=:chatId and m.sellerRead=0")
    Integer getSellerUnreadMessageCount(int chatId);

    @Query("select count(*) from Message m where m.chat.id=:chatId and m.buyerRead=0")
    Integer getBuyerUnreadMessageCount(int chatId);

    @Modifying
    @Query("update Message m set m.buyerRead=1 where m.chat.id=:chatId")
    void readBuyerMessages(int chatId);

    @Modifying
    @Query("update Message m set m.sellerRead=1 where m.chat.id=:chatId")
    void readSellerMessages(int chatId);
}
