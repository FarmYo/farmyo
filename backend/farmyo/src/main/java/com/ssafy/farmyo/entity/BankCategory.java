package com.ssafy.farmyo.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "bank_category")
public class BankCategory {

    // 식별
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    // 은행명
    @Column(name = "category_name", nullable = false, unique = true)
    private String categoryName;
}
