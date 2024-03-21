package org.ssafy.ssafy_sec_proj.trail.dto.response;

import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
public class CustomTrailDetailResponseDto {
    String trailsName;
    String createdAt;
    boolean isPublic;
    String trailsImg;
    String runtime;
    double distance;
    String address; // 서울 구로구 개봉동
    int starRanking;
    String memo;

    @Builder
    private CustomTrailDetailResponseDto(String trailsName, String createdAt, boolean isPublic, String trailsImg,
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
    public static CustomTrailDetailResponseDto of(String trailsName, LocalDateTime createdAt, boolean isPublic, String trailsImg,
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
