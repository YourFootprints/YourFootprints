package org.ssafy.ssafy_sec_proj.facility.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.ssafy.ssafy_sec_proj._common.entity.BaseTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@SQLDelete(sql = "UPDATE places set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
@Table(name = "places")
public class Place extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "latitude", nullable = false)
    private Double latitude;

    @Column(name = "longitude", nullable = false)
    private Double longitude;

    @Column(name = "place_name", nullable = false, length = 50)
    private String placeName;

    @Enumerated(EnumType.STRING)
    @Column(name = "place_type", nullable = false)
    private PlaceType placeType;

    public enum PlaceType {
        WATER,
        TOILET,
        CONVENIENCE,
        FOOD,
        CAFE,
        CCTV,
        POLICE
    }

    @Builder
    private Place(Double latitude, Double longitude, String placeName, PlaceType placeType) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.placeName = placeName;
        this.placeType = placeType;
    }

    public static Place of(Double latitude, Double longitude, String placeName, PlaceType placeType) {
        return builder()
                .latitude(latitude)
                .longitude(longitude)
                .placeName(placeName)
                .placeType(placeType)
                .build();
    }
}
