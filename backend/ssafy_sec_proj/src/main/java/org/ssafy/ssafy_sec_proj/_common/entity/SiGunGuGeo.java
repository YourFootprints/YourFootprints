package org.ssafy.ssafy_sec_proj._common.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.locationtech.jts.geom.Geometry;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
// DB 테이블명이 클래스명과 다를 시 작성
@Table(name = "si_gun_gu_entity")
@SQLDelete(sql = "UPDATE si_gun_gu_entity set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
@Getter
public class SiGunGuGeo extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sigungu_cd", length = 20, nullable = false)
    private String sigunguCd; // 시군구 코드

    @Column(name = "sigungu_nm", length = 50, nullable = false)
    private String sigunguNm; // 시군구 한글명

    @Column(name = "geometry", nullable = false)
    private Geometry geometry; // 지리적 다각형
}
