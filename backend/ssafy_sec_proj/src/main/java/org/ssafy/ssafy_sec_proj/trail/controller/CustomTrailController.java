package org.ssafy.ssafy_sec_proj.trail.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.ssafy.ssafy_sec_proj._common.response.ApiResponseDto;
import org.ssafy.ssafy_sec_proj._common.response.MsgType;
import org.ssafy.ssafy_sec_proj._common.response.ResponseUtils;
import org.ssafy.ssafy_sec_proj._common.security.UserDetailsImpl;
import org.ssafy.ssafy_sec_proj.trail.dto.response.CustomTrailDetailResponseDto;
import org.ssafy.ssafy_sec_proj.trail.service.CustomTrailDetailService;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CustomTrailController {
    private final CustomTrailDetailService customTrailsDetailService;

    @GetMapping("/main/trails/{trails-id}/records")
    public ApiResponseDto<CustomTrailDetailResponseDto> getCustomTrailsDetail(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                                              @PathVariable("trails-id") Long trailsId) {
        return ResponseUtils.ok(customTrailsDetailService.readCustomTrailDetail(trailsId), MsgType.SEARCH_CUSTOM_TRAIL_DETAIL_SUCCESSFULLY);
    }
}
