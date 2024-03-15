package org.ssafy.ssafy_sec_proj.ranking.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.ssafy.ssafy_sec_proj._common.entity.BaseTime;
import org.ssafy.ssafy_sec_proj.trail.entity.CustomTrails;
import org.ssafy.ssafy_sec_proj.users.entity.RecUsers;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "recommend_trails")
@SQLDelete(sql = "UPDATE recommend_trails set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
@Getter
public class RecommendTrails extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "si_do", length = 20, nullable = false)
    String siDo;

    @Column(name = "si_gun_go", length = 20, nullable = false)
    String siGunGo;

    @Column(name = "eup_myeon_dong", length = 30, nullable = false)
    String eupMyeonDong;

    @Column(name = "trails_id", nullable = false)
    Long trailsId;

    @Builder
    private RecommendTrails(String siDo, String siGunGo, String eupMyeonDong, Long trailsId) {
        this.siDo = siDo;
        this.siGunGo = siGunGo;
        this.eupMyeonDong = eupMyeonDong;
        this.trailsId = trailsId;
    }

    public static RecommendTrails of(String siDo, String siGunGo, String eupMyeonDong, Long trailsId) {
        return builder()
                .siDo(siDo)
                .siGunGo(siGunGo)
                .eupMyeonDong(eupMyeonDong)
                .trailsId(trailsId)
                .build();
    }
}
