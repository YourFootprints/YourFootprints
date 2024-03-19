package org.ssafy.ssafy_sec_proj.trail.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CalenderRecordResponseDto {
    int day;
    String trailsName;
    String runtime;
    double distance;

    @Builder
    private CalenderRecordResponseDto(String trailsName, String runtime, double distance){

    }
}
