package org.ssafy.ssafy_sec_proj.trail.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
public class CustomTrailDetailResponseDto {
    String trailsName; // 산책로 이름
    LocalDateTime createdAt; // 생성 시간
    boolean isPublic; // 공개 여부
    String trailsImg; // 지도 이미지
    String runtime; // 달린 시간
    double distance; // 거리
    int starRanking; // 별점
    String memo; // 메모

    @Builder
    private CustomTrailDetailResponseDto(String trailsName, LocalDateTime createdAt, boolean isPublic, String trailsImg,
                                         String runtime, double distance, int starRanking, String memo){
        this.trailsName = trailsName;
        this.createdAt = createdAt;
        this.isPublic = isPublic;
        this.trailsImg = trailsImg;
        this.runtime = runtime;
        this.distance = distance;
        this.starRanking = starRanking;
        this.memo = memo;
    };
    public static CustomTrailDetailResponseDto of(String trailsName, LocalDateTime createdAt, boolean isPublic, String trailsImg,
                                                  String runtime, double distance, int starRanking, String memo){
        return builder()
                .trailsName(trailsName)
                .createdAt(createdAt)
                .isPublic(isPublic)
                .trailsImg(trailsImg)
                .runtime(runtime)
                .distance(distance)
                .starRanking(starRanking)
                .memo(memo)
                .build();
    }
}
