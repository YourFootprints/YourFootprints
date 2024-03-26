package org.ssafy.ssafy_sec_proj.trail.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CustomTrailsReceiveDataRequestDto {

    private String runtime;
    private double distance;
    private int calorie;
    private List<SpotDto> spotLists;

    @Getter
    @Setter
    public static class SpotDto {
        private double la;
        private double lo;
    }
}
