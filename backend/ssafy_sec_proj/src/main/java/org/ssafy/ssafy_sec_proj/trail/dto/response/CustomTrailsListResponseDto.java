package org.ssafy.ssafy_sec_proj.trail.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CustomTrailsListResponseDto {
    private List<RecordResponseDto> trailsList;

    @Builder
    private  CustomTrailsListResponseDto(List<RecordResponseDto> trailsList) {
        this.trailsList = trailsList;
    }
    public static CustomTrailsListResponseDto from(List<RecordResponseDto> trailsList) {
        return builder()
                .trailsList(trailsList)
                .build();
    }
}
