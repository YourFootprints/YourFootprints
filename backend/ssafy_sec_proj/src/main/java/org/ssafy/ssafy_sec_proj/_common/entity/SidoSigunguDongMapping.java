package org.ssafy.ssafy_sec_proj._common.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
// DB 테이블명이 클래스명과 다를 시 작성
@Table(name = "sido_sigungu_dong_mapping")
@SQLDelete(sql = "UPDATE sido_sigungu_dong_mapping set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
@Getter
public class SidoSigunguDongMapping extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sido_sigungu_dong", length = 255, nullable = false)
    private String sidoSigunguDong; // 시도,시군구,동 이름

    @Builder
    private SidoSigunguDongMapping(String sidoSigunguDong) {
        this.sidoSigunguDong = sidoSigunguDong;
    }

    public static SidoSigunguDongMapping of(String sidoSigunguDong) {
        return builder()
                .sidoSigunguDong(sidoSigunguDong)
                .build();
    }
}
