package org.ssafy.ssafy_sec_proj.trail.dto.response;

import lombok.*;
import org.ssafy.ssafy_sec_proj.trail.entity.CustomTrails;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CalenderRecordResponseDto {
    private int day;
    private String trailsName;
    private String runtime;
    private double distance;

    @Builder
    private CalenderRecordResponseDto(int day, String trailsName, String runtime, double distance){
        this.day = day;
        this.trailsName = trailsName;
        this.runtime = runtime;
        this.distance = distance;
    }

    public static CalenderRecordResponseDto of(CustomTrails customTrails){
        return builder()
                .day(customTrails.getCreatedAt().getDayOfMonth())
                .trailsName(customTrails.getTrailsName())
                .runtime(customTrails.getRuntime())
                .distance(customTrails.getDistance())
                .build();
    }
}
