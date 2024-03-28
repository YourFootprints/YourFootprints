package org.ssafy.ssafy_sec_proj.trail.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CoordinateRequestDto {
    private double latitude;
    private double longitude;

    @Builder
    private CoordinateRequestDto(double latitude, double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public static CoordinateRequestDto of(double latitude, double longitude) {
        return builder()
                .latitude(latitude)
                .longitude(longitude)
                .build();
    }
}
