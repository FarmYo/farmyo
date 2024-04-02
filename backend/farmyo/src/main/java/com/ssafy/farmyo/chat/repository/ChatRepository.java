package com.ssafy.farmyo.chat.repository;

import com.ssafy.farmyo.chat.dto.ChatDetailDto;
import com.ssafy.farmyo.chat.dto.ChatDto;
import com.ssafy.farmyo.chat.dto.ChatRoomListDto;
import com.ssafy.farmyo.chat.dto.MessageListDto;
import com.ssafy.farmyo.entity.Chat;
import com.ssafy.farmyo.entity.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer> {

    // BoardId 와 SellerId, BuyerId 로 이루어진 채팅방이 있는지 확인한다.
    Optional<Chat> findByBoardIdAndSellerIdAndBuyerId(int BoardId, int SellerId, int BuyerId);

    @Query("SELECT new com.ssafy.farmyo.chat.dto.ChatRoomListDto(c.id, u.nickname, u.profile, m.content, m.createdAt)\n" +
            "FROM Chat c\n" +
            "JOIN Message m ON c.id = m.chat.id\n" +
            "JOIN User u ON c.buyer.id = u.id\n" +
            "WHERE c.seller.id = :userId \n" +
            "AND m.createdAt = (\n" +
            "    SELECT MAX(m2.createdAt)\n" +
            "    FROM Message m2\n" +
            "    WHERE m2.chat.id = c.id\n" +
            ")" +
            "order by m.createdAt desc "
    )
    List<ChatRoomListDto> getChatRoomListWhenSeller(int userId);

    @Query("SELECT new com.ssafy.farmyo.chat.dto.ChatRoomListDto(c.id, u.nickname, u.profile, m.content, m.createdAt)\n" +
            "FROM Chat c\n" +
            "JOIN Message m ON c.id = m.chat.id\n" +
            "JOIN User u ON c.seller.id = u.id\n" +
            "WHERE c.buyer.id = :userId \n" +
            "AND m.createdAt = (\n" +
            "    SELECT MAX(m2.createdAt)\n" +
            "    FROM Message m2\n" +
            "    WHERE m2.chat.id = c.id\n" +
            ")" +
            "order by m.createdAt desc "
    )
    List<ChatRoomListDto> getChatRoomListWhenBuyer(int userId);

    @Query("select new com.ssafy.farmyo.chat.dto.ChatDetailDto(u.nickname, u.profile) from User u join Chat c on u.id=c.buyer.id where c.id=:chatId")
    Optional<ChatDetailDto> getChatDetailWhenSeller(int chatId);

    @Query("select new com.ssafy.farmyo.chat.dto.ChatDetailDto(u.nickname, u.profile) from User u join Chat c on u.id=c.seller.id where c.id=:chatId")
    Optional<ChatDetailDto> getChatDetailWhenBuyer(int chatId);


}