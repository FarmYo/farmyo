package com.ssafy.farmyo.chat.repository;

import com.ssafy.farmyo.chat.dto.MessageDetailDto;
import com.ssafy.farmyo.chat.dto.MessageListDto;
import com.ssafy.farmyo.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {

//    @Query("select new com.ssafy.farmyo.chat.dto.MessageListDto() from Message m join m.userId where ")
//    List<MessageDto> findAllById(int chatId);

//    @Query("Select new com.ssafy.farmyo.chat.dto.MessageDetailDto(u.id, m.content, m.createdAt) from Message m join User u on m.userId = u.id where m.chat.id=:chatId")
//    List<MessageDetailDto> findAllById(int chatId);

    @Query("Select new com.ssafy.farmyo.chat.dto.MessageDetailDto(u.id, m.content, m.createdAt) from Message m join User u on m.userId = u.id where m.chat.id=:chatId order by m.createdAt")
    List<MessageDetailDto> findAllById(int chatId, Pageable pageable);

}
