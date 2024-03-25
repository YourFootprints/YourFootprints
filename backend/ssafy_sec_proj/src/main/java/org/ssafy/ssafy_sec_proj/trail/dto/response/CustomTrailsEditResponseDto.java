package org.ssafy.ssafy_sec_proj.trail.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
public class CustomTrailsEditResponseDto {
    private String trailsName;
    private String createdAt;
    private boolean isPublic;
    private String trailsImg;
    private String runtime;
    private double distance;
    private String address;
    private int starRanking;
    private  String memo;

    @Builder
    private CustomTrailsEditResponseDto(String trailsName, String createdAt, boolean isPublic, String trailsImg,
                                         String runtime, double distance, String address, int starRanking, String memo){
        this.trailsName = trailsName;
        this.createdAt = createdAt;
        this.isPublic = isPublic;
        this.trailsImg = trailsImg;
        this.runtime = runtime;
        this.distance = distance;
        this.address = address;
        this.starRanking = starRanking;
        this.memo = memo;
    };
    public static CustomTrailsEditResponseDto of(String trailsName, LocalDateTime createdAt, boolean isPublic, String trailsImg,
                                                  String runtime, double distance, String address, int starRanking, String memo){
        DateTimeFormatter dtFmt = DateTimeFormatter.ofPattern("yyyy.MM.dd hh:mm:ss");
        return builder()
                .trailsName(trailsName)
                .createdAt(createdAt.format(dtFmt))
                .isPublic(isPublic)
                .trailsImg(trailsImg)
                .runtime(runtime)
                .distance(distance)
                .address(address)
                .starRanking(starRanking)
                .memo(memo)
                .build();
    }
}
