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
@Table(name = "users_rankings")
@SQLDelete(sql = "UPDATE users_rankings set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
@Getter
public class UserRankings extends BaseTime {

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

    @Column(name = "footstep_cnt", nullable = false)
    int footstepCnt;

    @Column(name = "users_nickname", length = 20, nullable = false)
    String usersNickname;

    @Column(name = "users_profile_img", length = 20, nullable = false)
    String usersProfileImg;

    @Builder
    private UserRankings(String siDo, String siGunGo, String eupMyeonDong, int footstepCnt, String usersNickname, String usersProfileImg) {
        this.siDo = siDo;
        this.siGunGo = siGunGo;
        this.eupMyeonDong = eupMyeonDong;
        this.footstepCnt = footstepCnt;
        this.usersNickname = usersNickname;
        this.usersProfileImg = usersProfileImg;
    }

    public static UserRankings of(String siDo, String siGunGo, String eupMyeonDong, int footstepCnt, String usersNickname, String usersProfileImg) {
        return builder()
                .siDo(siDo)
                .siGunGo(siGunGo)
                .eupMyeonDong(eupMyeonDong)
                .footstepCnt(footstepCnt)
                .usersNickname(usersNickname)
                .usersProfileImg(usersProfileImg)
                .build();
    }
}
