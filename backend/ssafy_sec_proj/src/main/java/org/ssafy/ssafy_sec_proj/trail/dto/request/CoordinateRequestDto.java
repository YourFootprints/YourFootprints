package org.ssafy.ssafy_sec_proj.trail.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CoordinateRequestDto {
    private double lat;
    private double lng;

    @Builder
    private CoordinateRequestDto(double lat, double lng) {
        this.lat = lat;
        this.lng = lng;
    }

    public static CoordinateRequestDto of(double lat, double lng) {
        return builder()
                .lat(lat)
                .lng(lng)
                .build();
    }
}
