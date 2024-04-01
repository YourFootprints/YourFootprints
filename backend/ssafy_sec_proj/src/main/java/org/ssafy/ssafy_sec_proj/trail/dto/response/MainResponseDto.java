package org.ssafy.ssafy_sec_proj.trail.dto.response;

import lombok.Builder;
import lombok.Getter;
import org.ssafy.ssafy_sec_proj.trail.entity.CustomTrails;

import java.util.List;

@Getter
public class MainResponseDto {
    String profileImg;
    String nickName;
    String accumulatedWalkingTime;
    double accumulatedDistance;
    int accumulatedCalorie;
    List<RecordResponseDto> aroundTrailsRecommend;

    @Builder
    private MainResponseDto(String profileImg, String nickName, String accumulatedWalkingTime,
                            double accumulatedDistance, int accumulatedCalorie, List<RecordResponseDto> aroundTrailsRecommend){
        this.profileImg = profileImg;
        this.nickName = nickName;
        this.accumulatedWalkingTime = accumulatedWalkingTime;
        this.accumulatedDistance = accumulatedDistance;
        this.accumulatedCalorie = accumulatedCalorie;
        this.aroundTrailsRecommend = aroundTrailsRecommend;
    }

    public static MainResponseDto of (String profileImg, String nickName, String accumulatedWalkingTime,
                                      double accumulatedDistance, int accumulatedCalorie, List<RecordResponseDto> aroundTrailsRecommend){
        return builder()
                .profileImg(profileImg)
                .nickName(nickName)
                .accumulatedWalkingTime(accumulatedWalkingTime)
                .accumulatedDistance(accumulatedDistance)
                .accumulatedCalorie(accumulatedCalorie)
                .aroundTrailsRecommend(aroundTrailsRecommend)
                .build();
    }
}
