package org.ssafy.ssafy_sec_proj.trail.dto.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;

@Getter
@Setter
public class CustomTrailsEndRequestDto {
    private String runtime;
    private double distance;
    private int calorie;
    private MultipartFile trailsImg;
    private List<CustomTrailsReceiveDataRequestDto.SpotDto> spotLists;
}
