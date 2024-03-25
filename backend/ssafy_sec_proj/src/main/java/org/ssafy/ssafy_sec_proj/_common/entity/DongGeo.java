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
@Table(name = "dong_entity")
@SQLDelete(sql = "UPDATE dong_entity set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
@Getter
public class DongGeo extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "emd_cd", length = 20, nullable = false)
    private String emdCd; // 읍면동 코드

    @Column(name = "emd_kor_nm", length = 50, nullable = false)
    private String emdKorNm; // 읍면동 한글명

    @Column(name = "geometry", nullable = false)
    private Geometry geometry; // 지리적 다각형
}
