package com.ssafy.farmyo.chat.repository;

import com.ssafy.farmyo.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {

}
