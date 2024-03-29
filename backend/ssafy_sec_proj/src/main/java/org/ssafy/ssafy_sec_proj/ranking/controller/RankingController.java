package org.ssafy.ssafy_sec_proj.ranking.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.ssafy.ssafy_sec_proj._common.response.ApiResponseDto;
import org.ssafy.ssafy_sec_proj._common.response.MsgType;
import org.ssafy.ssafy_sec_proj._common.response.ResponseUtils;
import org.ssafy.ssafy_sec_proj._common.security.UserDetailsImpl;
import org.ssafy.ssafy_sec_proj.ranking.service.RankingService;
import org.ssafy.ssafy_sec_proj.trail.dto.response.CustomTrailDetailResponseDto;

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
    public ApiResponseDto<CustomTrailDetailResponseDto> myFootstep(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseUtils.ok(rankingService.myFootstep(userDetails.getUser()), MsgType.SEARCH_CUSTOM_TRAIL_DETAIL_SUCCESSFULLY);
    }
}
