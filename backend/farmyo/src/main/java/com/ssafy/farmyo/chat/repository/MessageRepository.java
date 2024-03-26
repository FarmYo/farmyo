package com.ssafy.farmyo.chat.repository;

import com.ssafy.farmyo.chat.dto.MessageDto;
import com.ssafy.farmyo.chat.dto.MessageListDto;
import com.ssafy.farmyo.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {

//    @Query("select new com.ssafy.farmyo.chat.dto.MessageListDto() from Message m join m.userId where ")
//    List<MessageDto> findAllById(int chatId);

    @Query("SELECT new com.ssafy.farmyo.chat.dto.MessageListDto(u.id, u.nickname, m.content, m.createdAt) FROM Message m join User u on m.userId=u.id WHERE m.chat.id = :chatId")
    List<MessageListDto> findAllById(int chatId);

}
