package org.ssafy.ssafy_sec_proj._common.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CoordinateRequestDto {

    private double x;
    private double y;

    @Builder
    public CoordinateRequestDto(double x, double y) {
        this.x = x;
        this.y = y;
    }

    public static CoordinateRequestDto of(double x, double y) {
        return new CoordinateRequestDto(x, y);
    }
}
