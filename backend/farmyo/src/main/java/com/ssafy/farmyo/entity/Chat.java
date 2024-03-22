package com.ssafy.farmyo.entity;

import com.ssafy.farmyo.common.entity.BaseTime;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "chat")
public class Chat extends BaseTime {
    //식별
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    //게시판매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", nullable = false)
    private Board board;

    //판매자매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_seller", nullable = false)
    private User seller;

    //구매자매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_buyer", nullable = false)
    private User buyer;

    //세션정보
    @Column(name = "session_id")
    private String sessionId;

    @OneToMany(mappedBy = "chat")
    private List<Message> messages;

    //거래매핑
    @OneToOne(mappedBy = "chat", fetch = FetchType.LAZY)
    private Trade trade;


    //빌더
    @Builder
    public Chat(Board board, User seller, User buyer, String sessionId) {
        this.board = board;
        this.seller = seller;
        this.buyer = buyer;
        this.sessionId = sessionId;
    }

    public void updateChat(String sessionId) {
        this.sessionId = sessionId;
    }



}
