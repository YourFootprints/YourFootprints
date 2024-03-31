package org.ssafy.ssafy_sec_proj.trail.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
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
        @JsonProperty("La")
        private double La;
        @JsonProperty("Ma")
        private double Ma;
    }

    @Builder
    private CustomTrailsReceiveDataRequestDto(String runtime, double distance, int calorie, List<SpotDto> spotLists) {
        this.runtime = runtime;
        this.distance = distance;
        this.calorie = calorie;
        this.spotLists = spotLists;
    }

    public static CustomTrailsReceiveDataRequestDto of(String runtime, double distance, int calorie, List<SpotDto> spotLists) {
        return builder()
                .runtime(runtime)
                .distance(distance)
                .calorie(calorie)
                .spotLists(spotLists)
                .build();
    }
}
