package org.ssafy.ssafy_sec_proj.trail.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "trails_around_facility")
@SQLDelete(sql = "UPDATE trails_around_facility set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
@Getter
public class TrailsAroundFacility {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "cctv_num", nullable = false)
    int cctvNum;

    @Column(name = "convenience_num", nullable = false)
    int convenienceNum;

    @Column(name = "cafe_num", nullable = false)
    int cafeNum;

    @Column(name = "restaurant_num", nullable = false)
    int restaurantNum;

    @Column(name = "police_num", nullable = false)
    int policeNum;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "custom_trails")
    public CustomTrails trailsId;

    @Builder
    private TrailsAroundFacility(int cctvNum, int convenienceNum, int cafeNum, int restaurantNum, int policeNum, CustomTrails trailsId) {
        this.cctvNum = cctvNum;
        this.convenienceNum = convenienceNum;
        this.cafeNum = cafeNum;
        this.restaurantNum = restaurantNum;
        this.policeNum = policeNum;
        this.trailsId = trailsId;
    }

    public static TrailsAroundFacility of(int cctvNum, int convenienceNum, int cafeNum, int restaurantNum, int policeNum, CustomTrails trailsId) {
        return builder()
                .cctvNum(cctvNum)
                .convenienceNum(convenienceNum)
                .cafeNum(cafeNum)
                .restaurantNum(restaurantNum)
                .policeNum(policeNum)
                .trailsId(trailsId)
                .build();
    }
}
