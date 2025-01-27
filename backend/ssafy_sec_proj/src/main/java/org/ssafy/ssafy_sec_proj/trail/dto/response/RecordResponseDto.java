package org.ssafy.ssafy_sec_proj.trail.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecordResponseDto {
    private Long trailsId;
    private String trailsImg;
    private int runtime;
    private double distance;
    private int likeNum;
    private String address; // 구미시 진평동 (시군구 + 읍면동)
    private boolean isLike; // 좋아요 여부


    @Builder
    private RecordResponseDto(Long trailsId, String trailsImg, int runtime, double distance,
                              int likeNum, String address, boolean isLike){
        this.trailsId = trailsId;
        this.trailsImg = trailsImg;
        this.runtime = runtime;
        this.distance = distance;
        this.likeNum = likeNum;
        this.address = address;
        this.isLike = isLike;
    }

    public static RecordResponseDto of(Long trailsId, String trailsImg, int runtime, double distance,
                                       int likeNum, String address, boolean isLike){
        return builder()
                .trailsId(trailsId)
                .trailsImg(trailsImg)
                .runtime(runtime)
                .distance(distance)
                .likeNum(likeNum)
                .address(address)
                .isLike(isLike)
                .build();
    }
}
