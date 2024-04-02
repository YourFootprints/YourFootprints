package org.ssafy.ssafy_sec_proj.trail.dto.response;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AroundFacilityResponseDto {

    String address;
    String place;
    double lat;
    double log;
    String source;
    String phone;
    String distribution;


    @Builder
    private AroundFacilityResponseDto(String address, String place, double lat, double log, String source, String phone, String distribution) {
        this.address = address;
        this.place = place;
        this.lat = lat;
        this.log = log;
        this.source = source;
        this.phone = phone;
        this.distribution = distribution;
    }

    public static AroundFacilityResponseDto of(String address, String place, double lat, double log, String source, String phone, String distribution) {

        return builder()
                .address(address)
                .place(place)
                .lat(lat)
                .log(log)
                .source(source)
                .phone(phone)
                .distribution(distribution)
                .build();
    }
}

