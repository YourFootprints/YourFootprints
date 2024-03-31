package org.ssafy.ssafy_sec_proj.ranking.dto.responseDto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class WeekRankingListResponseDto implements Comparable<WeekRankingListResponseDto> {

    String userName;
    String userImgUrl;
    int visitedNum;
    int rank;

    @Builder
    private WeekRankingListResponseDto(String userName, String userImgUrl, int visitedNum, int rank) {
        this.userName = userName;
        this.userImgUrl = userImgUrl;
        this.visitedNum = visitedNum;
        this.rank = rank;
    }

    public static WeekRankingListResponseDto of(String userName, String userImgUrl, int visitedNum) {
        return builder()
                .userName(userName)
                .userImgUrl(userImgUrl)
                .visitedNum(visitedNum)
                .build();
    }

    @Override
    public int compareTo(WeekRankingListResponseDto o) {
        return o.visitedNum-this.visitedNum;
    }

    public void updateRank(int i) {
        this.rank = i;
    }
}
