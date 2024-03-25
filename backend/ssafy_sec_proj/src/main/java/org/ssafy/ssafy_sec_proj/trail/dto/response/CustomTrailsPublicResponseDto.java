package org.ssafy.ssafy_sec_proj.trail.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomTrailsPublicResponseDto {
    private boolean isPublic;

    @Builder CustomTrailsPublicResponseDto(boolean isPublic) {
        this.isPublic = isPublic;
    }

    public static CustomTrailsPublicResponseDto of(boolean isPublic){
        return builder()
                .isPublic(isPublic)
                .build();
    }
}
