package org.ssafy.ssafy_sec_proj.ranking.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.ssafy.ssafy_sec_proj._common.entity.BaseTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
// DB 테이블명이 클래스명과 다를 시 작성
@Table(name = "footsteps")
@SQLDelete(sql = "UPDATE footsteps set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
@Getter
public class Footsteps extends BaseTime {

    @Id
    // auto_increment로 설정했다면 타입 설정할 것
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // 필드명이 다를 시 설정
    @Column(name = "id")
    private Long id;

    @Column(name = "latitude", nullable = false)
    double latitude;

    @Column(name = "longitude", nullable = false)
    double longitude;

    @Column(name = "visited_num", nullable = false)
    int visitedNum;

    @Column(name = "user_id", nullable = false)
    Long userId;

    @Column(name = "address", nullable = false)
    String address;

    @Builder
    private Footsteps(double latitude, double longitude, int visitedNum, Long userId, String address) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.visitedNum = visitedNum;
        this.userId = userId;
        this.address = address;
    }

    public static Footsteps of(double latitude, double longitude, int visitedNum, Long userId, String address) {
        return builder()
                .latitude(latitude)
                .longitude(longitude)
                .visitedNum(visitedNum)
                .userId(userId)
                .address(address)
                .build();
    }
}
