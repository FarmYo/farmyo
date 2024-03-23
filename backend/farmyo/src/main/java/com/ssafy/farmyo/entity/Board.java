package com.ssafy.farmyo.entity;

import com.ssafy.farmyo.common.entity.BaseTime;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "board")
public class Board extends BaseTime {
    //식별id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    //유저매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    //작물매핑
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id")
    private Crop crop;

    //카테고리식별ID
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private CropCategory cropCategory;

    //타입 0이면 팜요 1이면 삼요
    @Column(name = "board_type", nullable = false)
    private int boardType;

    //제목
    @Column(name = "board_title", nullable = false)
    private String boardTitle;

    //내용
    @Column(name = "board_content", nullable = false)
    private String boardContent;

    //거래가능량
    @Column(name = "board_quantity", nullable = false)
    private int boardQuantity;

    //kg당가격
    @Column(name = "board_price", nullable = false)
    private int boardPrice;

    //게시판이미지매핑
    @OneToMany(mappedBy = "board")
    @OrderBy("imgOrder ASC")
    private List<BoardImg> boardImgList = new ArrayList<>();

    //채팅방매핑
    @OneToMany(mappedBy = "board")
    private List<Chat> chatList = new ArrayList<>();

    //거래매핑
    @OneToMany(mappedBy = "board")
    private List<Trade> trades;


    //빌더
    @Builder
    public Board(User user, Crop crop, CropCategory cropCategory, int boardType, String boardTitle,
                 String boardContent, int boardQuantity, int boardPrice) {
        this.user = user;
        this.crop = crop;
        this.cropCategory = cropCategory;
        this.boardType = boardType;
        this.boardTitle = boardTitle;
        this.boardContent = boardContent;
        this.boardQuantity = boardQuantity;
        this.boardPrice = boardPrice;
    }

}
