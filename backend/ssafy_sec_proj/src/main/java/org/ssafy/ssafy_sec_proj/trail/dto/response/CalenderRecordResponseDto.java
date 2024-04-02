package org.ssafy.ssafy_sec_proj.trail.dto.response;

import lombok.*;
import org.ssafy.ssafy_sec_proj.trail.entity.CustomTrails;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CalenderRecordResponseDto {
    private Long trailsId;
    private int day;
    private String trailsName;
    private String runtime;
    private double distance;

    @Builder
    private CalenderRecordResponseDto(Long trailsId, int day, String trailsName, String runtime, double distance){
        this.trailsId = trailsId;
        this.day = day;
        this.trailsName = trailsName;
        this.runtime = runtime;
        this.distance = distance;
    }

    public static CalenderRecordResponseDto of(Long trailsId, LocalDateTime createdAt, String trailsName, String runtime, double distance){
        ZonedDateTime utcTime = createdAt.atZone(ZoneId.of("UTC"));
        ZonedDateTime koreaTime = utcTime.withZoneSameInstant(ZoneId.of("Asia/Seoul"));

        return builder()
                .trailsId(trailsId)
                .day(koreaTime.getDayOfMonth())
                .trailsName(trailsName)
                .runtime(runtime)
                .distance(distance)
                .build();
    }
}
