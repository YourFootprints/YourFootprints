package org.ssafy.ssafy_sec_proj.trail.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomTrailsCreateResponseDto {

    private Long id;

    @Builder
    private CustomTrailsCreateResponseDto(Long id) {
        this.id = id;
    }

    public static CustomTrailsCreateResponseDto of(Long id) {
        return builder()
                .id(id)
                .build();
    }
}


