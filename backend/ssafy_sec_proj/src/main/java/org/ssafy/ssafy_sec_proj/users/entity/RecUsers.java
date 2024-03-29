package org.ssafy.ssafy_sec_proj.users.entity;

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
@Table(name = "rec_users")
@SQLDelete(sql = "UPDATE rec_users set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
@Getter
public class RecUsers extends BaseTime {

    @Id
    // auto_increment로 설정했다면 타입 설정할 것
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // 필드명이 다를 시 설정
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

    @Column(name = "sum_num", nullable = false)
    int sumNum;

    @Builder
    private RecUsers(int cctvNum, int convenienceNum, int cafeNum, int restaurantNum, int policeNum, int sumNum) {
        this.cctvNum = cctvNum;
        this.convenienceNum = convenienceNum;
        this.cafeNum = cafeNum;
        this.restaurantNum = restaurantNum;
        this.policeNum = policeNum;
        this.sumNum = sumNum;
    }

    public static RecUsers of(int cctvNum, int convenienceNum, int cafeNum, int restaurantNum, int policeNum, int sumNum) {
        return builder()
                .cctvNum(cctvNum)
                .convenienceNum(convenienceNum)
                .cafeNum(cafeNum)
                .restaurantNum(restaurantNum)
                .policeNum(policeNum)
                .sumNum(sumNum)
                .build();
    }
}
