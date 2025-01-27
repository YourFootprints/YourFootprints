package org.ssafy.ssafy_sec_proj.ranking.dto.responseDto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class FootstepListResponseDto {

    Long userId;
    String userNickName;
    int visitedNum;
    String userImgUrl;
    double la;
    double lo;

    @Builder
    private FootstepListResponseDto(Long userId, String userNickName, int visitedNum, String userImgUrl, double la, double lo) {
        this.userId = userId;
        this.userNickName = userNickName;
        this.visitedNum = visitedNum;
        this.userImgUrl = userImgUrl;
        this.la = la;
        this.lo = lo;
    }

    public static FootstepListResponseDto of(Long userId, String userNickName, int visitedNum, String userImgUrl, double la, double lo) {
        return builder()
                .userId(userId)
                .userNickName(userNickName)
                .visitedNum(visitedNum)
                .userImgUrl(userImgUrl)
                .la(la)
                .lo(lo)
                .build();
    }
}
