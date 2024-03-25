package org.ssafy.ssafy_sec_proj.trail.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CoordResponseDto {
    private double la;
    private double lo;

    @Builder
    private CoordResponseDto(double la, double lo) {
        this.la = la;
        this.lo = lo;
    }

    public static CoordResponseDto of(double la, double lo ){
        return builder()
                .la(la)
                .lo(lo)
                .build();
    }
}
