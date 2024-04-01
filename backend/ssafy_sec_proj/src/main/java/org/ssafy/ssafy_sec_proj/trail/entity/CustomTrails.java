package org.ssafy.ssafy_sec_proj.trail.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.ssafy.ssafy_sec_proj._common.entity.BaseTime;
import org.ssafy.ssafy_sec_proj.users.entity.User;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
// DB 테이블명이 클래스명과 다를 시 작성
@Table(name = "custom_trails")
@SQLDelete(sql = "UPDATE custom_trails set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
@Getter
public class CustomTrails extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "trails_name", length = 50, nullable = true)
    String trailsName;

    @Column(name = "memo", length = 255, nullable = true)
    String memo;

    @Column(name = "star_ranking", nullable = true)
    int starRanking;

    @Column(name = "runtime", length = 10, nullable = false)
    String runtime;

    @Column(name = "distance", nullable = false)
    double distance;

    @Column(name = "calorie", nullable = false)
    int calorie;

    @Column(name = "trails_img", length = 120, nullable = true)
    String trailsImg;

    @Column(name = "is_public", nullable = true)
    boolean isPublic;

    @Column(name = "like_num", nullable = true)
    int likeNum;

    @Column(name = "si_do", length = 20, nullable = false)
    String siDo;

    @Column(name = "si_gun_go", length = 20, nullable = false)
    String siGunGo;

    @Column(name = "eup_myeon_dong", length = 30, nullable = false)
    String eupMyeonDong;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users", nullable = false)
    private User userId;

    @Builder
    private CustomTrails(String trailsName, String memo, int starRanking, String runtime, double distance, int calorie, String trailsImg, boolean isPublic,
                        int likeNum, String siDo, String siGunGo, String eupMyeonDong, User userId) {
        this.trailsName = trailsName;
        this.memo = memo;
        this.starRanking = starRanking;
        this.runtime = runtime;
        this.distance = distance;
        this.calorie = calorie;
        this.trailsImg = trailsImg;
        this.isPublic = isPublic;
        this.likeNum = likeNum;
        this.siDo = siDo;
        this.siGunGo = siGunGo;
        this.eupMyeonDong = eupMyeonDong;
        this.userId = userId;
    }

    public static CustomTrails of(String trailsName, String memo, int starRanking, String runtime, double distance, int calorie, String trailsImg, boolean isPublic,
                                  int likeNum, String siDo, String siGunGo, String eupMyeonDong, User userId) {
        return builder()
                .trailsName(trailsName)
                .memo(memo)
                .starRanking(starRanking)
                .runtime(runtime)
                .distance(distance)
                .calorie(calorie)
                .trailsImg(trailsImg)
                .isPublic(isPublic)
                .likeNum(likeNum)
                .siDo(siDo)
                .siGunGo(siGunGo)
                .eupMyeonDong(eupMyeonDong)
                .userId(userId)
                .build();
    }

    public void updateLikeNum(int num) {

        this.likeNum += num;
    }

    public void updatePublic(boolean isPublic) {
        this.isPublic = isPublic;
    }

    public void updateRecord(String memo, int starRanking, String trailsImg, String trailsName) {
        if (memo != null && !memo.isEmpty()){
            this.memo = memo;
        }
        if (starRanking != 0){
            this.starRanking = starRanking;
        }
        if (trailsImg != null && !trailsImg.isEmpty()){
            this.trailsImg = trailsImg;
        }
        if (trailsName != null && !trailsName.isEmpty()){
            this.trailsName = trailsName;
        }
    }

    public void updateImg(String trailsImg) {
        if (trailsImg != null && !trailsImg.isEmpty()){
            this.trailsImg = trailsImg;
        }
    }
}
