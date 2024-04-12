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
@Table(name = "board_img")
public class BoardImg extends BaseTime {

    //식별Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    //게시판매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", nullable = false)
    private Board board;

    //이미지순서
    @Column(name = "img_order", nullable = false)
    private int imgOrder;

    //이미지경로
    @Column(name = "img_url", nullable = false)
    private String imgUrl;

    //빌더
    @Builder
    public BoardImg(Board board, int imgOrder, String imgUrl) {
        this.board = board;
        this.imgOrder = imgOrder;
        this.imgUrl = imgUrl;
    }
}
