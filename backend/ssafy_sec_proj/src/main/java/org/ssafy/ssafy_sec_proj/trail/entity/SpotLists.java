package org.ssafy.ssafy_sec_proj.trail.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.ssafy.ssafy_sec_proj._common.entity.BaseTime;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "spot_lists")
@SQLDelete(sql = "UPDATE spot_lists set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
@Getter
public class SpotLists extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "la", nullable = false)
    double la;

    @Column(name = "lo", nullable = false)
    double lo;

    @Column(name = "duration", nullable = false)
    LocalDateTime duration;

    @Column(name = "si_do", length = 20, nullable = false)
    String siDo;

    @Column(name = "si_gun_go", length = 20, nullable = false)
    String siGunGo;

    @Column(name = "eup_myeon_dong", length = 30, nullable = false)
    String eupMyeonDong;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "custom_trails", nullable = false)
    @Column(name = "custom_trails_id")
    private CustomTrails customTrailsId;
}
