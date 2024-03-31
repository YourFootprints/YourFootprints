package org.ssafy.ssafy_sec_proj.trail.dto.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class CustomTrailsEndImageRequestDto {
    private MultipartFile trailsImg;

    public CustomTrailsEndImageRequestDto(MultipartFile trailsImg) {
        this.trailsImg = trailsImg;
    }
}
