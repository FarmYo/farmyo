package com.ssafy.farmyo.entity;

import com.ssafy.farmyo.common.entity.BaseTime;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "message")
public class Message extends BaseTime {

    //식별ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    //채팅방매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_id", nullable = false)
    private Chat chat;

    //채팅내용
    @Column(name = "chat_content", nullable = false)
    private String chatContent;

    //발신자
    @Column(name = "user_id", nullable = false)
    private Integer userId;

    //빌더
    @Builder
    public Message(Chat chat, String chatContent, Integer userId) {
        this.chat = chat;
        this.chatContent = chatContent;
        this.userId = userId;
    }
}
