package org.ssafy.ssafy_sec_proj.trail.dto.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class CustomTrailsEditRequestDto {
    private String memo;
    private int starRanking;
    private MultipartFile trailsImg;
    private String trailsName;
}
