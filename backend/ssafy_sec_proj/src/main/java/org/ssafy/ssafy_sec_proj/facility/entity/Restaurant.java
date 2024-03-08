package org.ssafy.ssafy_sec_proj.facility.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.ssafy.ssafy_sec_proj._common.entity.BaseTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE restaurant set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
@Table(name = "restaurant") // 카메라 정보를 저장하는 테이블
@Getter
public class Restaurant extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "restaurant_name", nullable = false, length = 50)
    private String restaurantName; // 사업장명

    @Column(name = "road_address", nullable = false, length = 150)
    private String roadAddress; // 소재지 도로명 주소

    @Column(name = "latitude", nullable = false)
    private double latitude; // WGS84 위도

    @Column(name = "longitude", nullable = false)
    private double longitude; // WGS84 경도

    @Column(name = "classification", nullable = false, length = 50)
    private String classification; // 업태구분명

    @Column(name = "restaurant_phone_number", nullable = false, length = 30)
    private String restaurantPhoneNumber; // 소재지전화

    @Builder
    private Restaurant(String restaurantName, String roadAddress, double latitude, double longitude, String classification, String restaurantPhoneNumber) {
        this.restaurantName = restaurantName;
        this.roadAddress = roadAddress;
        this.latitude = latitude;
        this.longitude = longitude;
        this.classification = classification;
        this.restaurantPhoneNumber = restaurantPhoneNumber;
    }

    public static Restaurant of(String restaurantName, String roadAddress, double latitude, double longitude, String classification, String restaurantPhoneNumber) {
        return builder()
                .restaurantName(restaurantName)
                .roadAddress(roadAddress)
                .latitude(latitude)
                .longitude(longitude)
                .classification(classification)
                .restaurantPhoneNumber(restaurantPhoneNumber)
                .build();
    }
}
