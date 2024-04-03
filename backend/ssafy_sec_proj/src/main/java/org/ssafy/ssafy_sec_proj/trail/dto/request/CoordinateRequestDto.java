package org.ssafy.ssafy_sec_proj.trail.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CoordinateRequestDto {
//    @JsonProperty("Ma")
    private double la;  // 위도
//    @JsonProperty("La")
    private double lo;  // 경도

    @Builder
    private CoordinateRequestDto(double la, double lo) {
        this.la = la;
        this.lo = lo;
    }

    public static CoordinateRequestDto of(double la, double lo) {
        return builder()
                .la(la)
                .lo(lo)
                .build();
    }
}