package org.ssafy.ssafy_sec_proj.trail.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AroundFacilityResponseDto {

    private List<String> toilet;
    private List<String> police;
    private List<String> restaurant;
    private List<String> cctv;
    private List<String> cafe;
    private List<String> convenience;

    @Getter
    @Setter
    @Builder
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class FacilityInfo {
        private String address;
        private String place;
        private Double latitude;
        private Double longitude;
        private String source;
        private String phone;
        private String distribution;
    }

}
