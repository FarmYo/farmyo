package com.ssafy.farmyo.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "ship_category")
public class ShipCategory {

    //식별ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    //회사이름
    @Column(name = "ship_name", nullable = false, unique = true)
    private String shipName;

}
