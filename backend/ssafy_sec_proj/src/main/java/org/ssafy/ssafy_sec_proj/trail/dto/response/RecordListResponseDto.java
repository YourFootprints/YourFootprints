package org.ssafy.ssafy_sec_proj.trail.dto.response;

import lombok.*;


import java.util.Collections;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RecordListResponseDto<T> {
    private List<T> trailsRecords;

    @Builder
    private RecordListResponseDto(List<T> trailsRecords){
        this.trailsRecords = trailsRecords != null ? trailsRecords : Collections.emptyList();
    }

    public static <T> RecordListResponseDto<T> from(List<T> trailsRecords){
        return RecordListResponseDto.<T>builder()
                .trailsRecords(trailsRecords)
                .build();
    }
}
