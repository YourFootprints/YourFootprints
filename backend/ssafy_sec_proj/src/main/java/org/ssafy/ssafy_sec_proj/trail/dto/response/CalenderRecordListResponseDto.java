package org.ssafy.ssafy_sec_proj.trail.dto.response;

import lombok.*;


import java.util.Collections;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CalenderRecordListResponseDto {
    private List<CalenderRecordResponseDto> trailsRecords;

    @Builder
    private CalenderRecordListResponseDto(List<CalenderRecordResponseDto> trailsRecords){
        this.trailsRecords = trailsRecords != null ? trailsRecords : Collections.emptyList();
    }

    public static CalenderRecordListResponseDto from(List<CalenderRecordResponseDto> calenderRecordResponseDtos){
        return builder()
                .trailsRecords(calenderRecordResponseDtos)
                .build();
    }
}
