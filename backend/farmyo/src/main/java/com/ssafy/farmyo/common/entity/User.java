package com.ssafy.farmyo.common.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user")
public class User {

    //회원식별ID
    @Id
    @Column(name = "id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY) // GenerationType.IDENTITY DB(SQL)에 위임
    private Long id;

    // 생성일
    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    //수정일
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    //탈퇴일
    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    //회원상태
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "user_status", nullable = false)
    private UserStatus status = UserStatus.ACTIVE;

    //아이디
    @Column(name = "user_loginid", nullable = false, unique = true)
    private String loginId;

    //패스워드
    @Column(name = "user_password", nullable = false)
    private String password;

    //전화번호
    @Column(name = "user_teletphone", nullable = false)
    private String telephone;

    //닉네임
    @Column(name = "user_nickname", nullable = false)
    private String nickname;

    //이메일
    @Column(name = "user_email", nullable = false)
    private String email;

    //프로필이미지
    @Column(name = "user_profile")
    private String profile;

    //한줄소개
    @Column(name = "user_comment")
    private String comment;

    // 빌더 패턴 적용
    @Builder
    public User( LocalDateTime deletedAt,
                UserStatus status, String loginId, String password, String telephone, String nickname,
                String email, String profile, String comment) {
        this.deletedAt = deletedAt;
        this.status = status;
        this.loginId = loginId;
        this.password = password;
        this.telephone = telephone;
        this.nickname = nickname;
        this.email = email;
        this.profile = profile;
        this.comment = comment;
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
