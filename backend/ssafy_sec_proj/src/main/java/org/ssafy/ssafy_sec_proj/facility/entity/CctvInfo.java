package org.ssafy.ssafy_sec_proj.facility.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.ssafy.ssafy_sec_proj._common.entity.BaseTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE cctv_info set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
@Table(name = "cctv_info") // 카메라 정보를 저장하는 테이블
@Getter
public class CctvInfo extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "management_agency_name", nullable = false, length = 50)
    private String managementAgencyName; // 관리기관명

    @Column(name = "road_address", nullable = false, length = 150)
    private String roadAddress; // 소재지 도로명 주소

    @Column(name = "latitude", nullable = false)
    private double latitude; // WGS84 위도

    @Column(name = "longitude", nullable = false)
    private double longitude; // WGS84 경도

    @Column(name = "camera_count", nullable = false)
    private int cameraCount; // 카메라 대수

    @Column(name = "purpose", nullable = false, length = 30)
    private String purpose; // 설치 목적 구분

    @Column(name = "management_phone_number", nullable = false, length = 30)
    private String managementPhoneNumber; // 관리기관 전화번호

    @Builder
    private CctvInfo(String managementAgencyName, String roadAddress, double latitude, double longitude, int cameraCount, String purpose, String managementPhoneNumber) {
        this.managementAgencyName = managementAgencyName;
        this.roadAddress = roadAddress;
        this.latitude = latitude;
        this.longitude = longitude;
        this.cameraCount = cameraCount;
        this.purpose = purpose;
        this.managementPhoneNumber = managementPhoneNumber;
    }

    public static CctvInfo of(String managementAgencyName, String roadAddress, double latitude, double longitude, int cameraCount, String purpose, String managementPhoneNumber) {
        return builder()
                .managementAgencyName(managementAgencyName)
                .roadAddress(roadAddress)
                .latitude(latitude)
                .longitude(longitude)
                .cameraCount(cameraCount)
                .purpose(purpose)
                .managementPhoneNumber(managementPhoneNumber)
                .build();
    }
}
