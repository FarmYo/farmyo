package com.ssafy.farmyo.entity;

import com.ssafy.farmyo.common.entity.BaseTime;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user")
@Inheritance(strategy = InheritanceType.JOINED)//조인전략으로 상속
public class User extends BaseTime {

    //회원식별ID
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // GenerationType.IDENTITY DB(SQL)에 위임
    private Integer id;

    //탈퇴일
    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    //회원상태 초기값 액티브설정
    @Enumerated(EnumType.STRING)
    @Column(name = "user_status", nullable = false)
    private UserStatus status = UserStatus.ACTIVE;

    //아이디
    @Column(name = "user_loginid", nullable = false, unique = true)
    private String loginId;

    //패스워드
    @Column(name = "user_password", nullable = false)
    private String password;

    //전화번호
    @Column(name = "user_telephone", nullable = false)
    private String telephone;

    //닉네임
    @Column(name = "user_nickname", nullable = false)
    private String nickname;

    //이메일
    @Column(name = "user_email", nullable = false)
    private String email;

    // 유저 직업 job=0 -> 판매자(seller), job=1 -> 구매자(buyer)
    @Column(name ="user_job", nullable = false)
    private int job;

    //프로필이미지
    @Column(name = "user_profile")
    private String profile;


    //한줄소개
    @Column(name = "user_comment")
    private String comment;

    //즐겨찾기
    @OneToMany(mappedBy = "user")
    private List<Favorite> favoritesAsBuyer = new ArrayList<>();

    //계좌
    @Embedded
    private Account account;

    //주소
    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    private Address address;

    //지갑
    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    private Wallet wallet;

    //게시글
    @OneToMany(mappedBy = "user")
    private List<Board> boards = new ArrayList<>();

    //채팅방(구매자로)
    @OneToMany(mappedBy = "buyer")
    private List<Chat> chatsAsBuyer = new ArrayList<>();

    //채팅방(판매자로)
    @OneToMany(mappedBy = "seller")
    private List<Chat> chatsAsSeller = new ArrayList<>();

    //거래(구매자)
    @OneToMany(mappedBy = "buyer")
    private List<Trade> tradesAsBuyer = new ArrayList<>();

    //거래(판매자)
    @OneToMany(mappedBy = "seller")
    private List<Trade> tradesAsSeller = new ArrayList<>();

    //입금
    @OneToMany(mappedBy = "buyer")
    private List<TradeDeposit> tradeDeposits = new ArrayList<>();

    //출금
    @OneToMany(mappedBy = "seller")
    private List<TradeWithdrawal> tradeWithdrawals = new ArrayList<>();



    // 빌더 패턴 적용
    @Builder
    public User(int id, int job, LocalDateTime deletedAt,
                UserStatus status, String loginId, String password, String telephone, String nickname,
                String email, String profile, String comment, Account account) {
        this.id = id;
        this.job = job;
        this.deletedAt = deletedAt;
        this.status = status;
        this.loginId = loginId;
        this.password = password;
        this.telephone = telephone;
        this.nickname = nickname;
        this.email = email;
        this.profile = profile;
        this.comment = comment;
        this.account = account;
    }

    public void updateDeletedAt(LocalDateTime deletedAt) {
        this.deletedAt = deletedAt;
    }

    public void updateStatus(UserStatus status ) {
        this.status = status;
    }

    public void updatePassword(String password ) {
        this.password = password;
    }

    public void updateTelephone(String telephone ) {
        this.telephone = telephone;
    }

    public void updateNickname(String nickname ) {
        this.nickname = nickname;
    }

    public void updateEmail(String email ) {
        this.email = email;
    }

    public void updateProfile(String profile) {
        this.profile = profile;
    }

    public void updateComment(String comment) {
        this.comment = comment;
    }


    //피그마보고 한번에 수정하는 거 모아둔 함수
    public void updateAll(String nickname, String email ,String telephone) {
        this.nickname = nickname;
        this.email = email;
        this.telephone = telephone;
    }

}
