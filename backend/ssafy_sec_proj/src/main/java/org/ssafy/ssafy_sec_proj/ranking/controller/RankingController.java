package org.ssafy.ssafy_sec_proj.ranking.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.ssafy.ssafy_sec_proj._common.response.ApiResponseDto;
import org.ssafy.ssafy_sec_proj._common.response.MsgType;
import org.ssafy.ssafy_sec_proj._common.response.ResponseUtils;
import org.ssafy.ssafy_sec_proj._common.security.UserDetailsImpl;
import org.ssafy.ssafy_sec_proj.ranking.dto.responseDto.FootstepListResponseDto;
import org.ssafy.ssafy_sec_proj.ranking.dto.responseDto.WeekRankingListResponseDto;
import org.ssafy.ssafy_sec_proj.ranking.service.RankingService;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RankingController {

    private final RankingService rankingService;

    @PostMapping("/footstep/produce")
    public ApiResponseDto<Void> makeFootstep() {

        rankingService.makeFootstep();
        return ResponseUtils.ok(MsgType.PRODUCE_FOOTSTEP_SUCCESSFULLY);
    }

    @GetMapping("/rankings/my-footsteps")
    public ApiResponseDto<List<FootstepListResponseDto>> findMyFootstep(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseUtils.ok(rankingService.findMyFootstep(userDetails.getUser()), MsgType.SEARCH_MY_FOOTSTEP_SUCCESSFULLY);
    }

    @GetMapping("/rankings/around-footsteps")
    public ApiResponseDto<List<FootstepListResponseDto>> findDongFootstep(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseUtils.ok(rankingService.findDongFootstep(userDetails.getUser()), MsgType.SEARCH_DONG_FOOTSTEP_SUCCESSFULLY);
    }

    @GetMapping("/rankings/week-rank")
    public ApiResponseDto<List<WeekRankingListResponseDto>> findWeekRanking(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseUtils.ok(rankingService.findWeekRanking(userDetails.getUser()), MsgType.SEARCH_WEEK_RANKING_SUCCESSFULLY);
    }
}
