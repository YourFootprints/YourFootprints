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
    int accumulatedFootstep;
    List<RecordResponseDto> aroundTrailsRecommend;
    List<RecordResponseDto> safeTrailsRecommend;

    @Builder
    private MainResponseDto(String profileImg, String nickName, String accumulatedWalkingTime,
                            double accumulatedDistance, int accumulatedFootstep, List<RecordResponseDto> aroundTrailsRecommend, List<RecordResponseDto> safeTrailsRecommend){
        this.profileImg = profileImg;
        this.nickName = nickName;
        this.accumulatedWalkingTime = accumulatedWalkingTime;
        this.accumulatedDistance = accumulatedDistance;
        this.accumulatedFootstep = accumulatedFootstep;
        this.aroundTrailsRecommend = aroundTrailsRecommend;
        this.safeTrailsRecommend = safeTrailsRecommend;

    }

    public static MainResponseDto of (String profileImg, String nickName, String accumulatedWalkingTime,
                                      double accumulatedDistance, int accumulatedFootstep, List<RecordResponseDto> aroundTrailsRecommend, List<RecordResponseDto> safeTrailsRecommend){
        return builder()
                .profileImg(profileImg)
                .nickName(nickName)
                .accumulatedWalkingTime(accumulatedWalkingTime)
                .accumulatedDistance(accumulatedDistance)
                .accumulatedFootstep(accumulatedFootstep)
                .aroundTrailsRecommend(aroundTrailsRecommend)
                .safeTrailsRecommend(safeTrailsRecommend)
                .build();
    }
}
