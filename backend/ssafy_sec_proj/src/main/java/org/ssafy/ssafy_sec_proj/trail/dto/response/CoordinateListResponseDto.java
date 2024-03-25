package org.ssafy.ssafy_sec_proj.trail.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CoordinateListResponseDto {
    private List<CoordResponseDto> coordinateList;

    @Builder
    private  CoordinateListResponseDto(List<CoordResponseDto> coordinateList) {
        this.coordinateList = coordinateList;
    }
    public static CoordinateListResponseDto from(List<CoordResponseDto> coordinateList) {
        return builder()
                .coordinateList(coordinateList)
                .build();
    }
}
