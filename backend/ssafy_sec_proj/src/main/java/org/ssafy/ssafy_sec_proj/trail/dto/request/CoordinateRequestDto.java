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
    @JsonProperty("La")
    private double La;
    @JsonProperty("Ma")
    private double Ma;

    @Builder
    private CoordinateRequestDto(double La, double Ma) {
        this.La = La;
        this.Ma = Ma;
    }

    public static CoordinateRequestDto of(double La, double Ma) {
        return builder()
                .La(La)
                .Ma(Ma)
                .build();
    }
}
