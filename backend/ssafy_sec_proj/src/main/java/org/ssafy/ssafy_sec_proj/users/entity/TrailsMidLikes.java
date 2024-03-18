package org.ssafy.ssafy_sec_proj.users.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.ssafy.ssafy_sec_proj._common.entity.BaseTime;
import org.ssafy.ssafy_sec_proj.trail.entity.CustomTrails;
import org.ssafy.ssafy_sec_proj.users.entity.User;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
// DB 테이블명이 클래스명과 다를 시 작성
@Table(name = "trails_mid_likes")
@SQLDelete(sql = "UPDATE trails_mid_likes set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
@Getter
public class TrailsMidLikes extends BaseTime {

    @Id
    // auto_increment로 설정했다면 타입 설정할 것
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // 필드명이 다를 시 설정
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users", nullable = false)
    private User userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "custom_trails", nullable = false)
    private CustomTrails trailsId;

    @Builder
    private TrailsMidLikes(User userId, CustomTrails trailsId) {
        this.userId = userId;
        this.trailsId = trailsId;
    }

    public static TrailsMidLikes of(User userId, CustomTrails trailsId) {
        return builder()
                .userId(userId)
                .trailsId(trailsId)
                .build();
    }
}
