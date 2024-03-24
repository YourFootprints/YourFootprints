package org.ssafy.ssafy_sec_proj.trail.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomTrailsEditRequestDto {
    private String memo;
    private int starRanking;
    private String trailsImg;
    private String trailsName;
}
