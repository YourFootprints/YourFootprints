package org.ssafy.ssafy_sec_proj.trail.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.ssafy.ssafy_sec_proj._common.response.ApiResponseDto;
import org.ssafy.ssafy_sec_proj._common.response.MsgType;
import org.ssafy.ssafy_sec_proj._common.response.ResponseUtils;
import org.ssafy.ssafy_sec_proj._common.security.UserDetailsImpl;
import org.ssafy.ssafy_sec_proj.trail.dto.response.CalenderRecordResponseDto;
import org.ssafy.ssafy_sec_proj.trail.dto.response.CustomTrailDetailResponseDto;
import org.ssafy.ssafy_sec_proj.trail.service.CustomTrailService;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CustomTrailsController {
    private final CustomTrailService customTrailService;

    @GetMapping("/main/trails/{trails-id}/records")
    public ApiResponseDto<CustomTrailDetailResponseDto> getCustomTrailDetail(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                                              @PathVariable("trails-id") Long trailsId) {
        return ResponseUtils.ok(customTrailService.readCustomTrailDetail(userDetails.getUser(), trailsId), MsgType.SEARCH_CUSTOM_TRAIL_DETAIL_SUCCESSFULLY);
    }

    // default 값 고민중
    @GetMapping("/main/calendar/records")
    public ApiResponseDto<CalenderRecordResponseDto> getCalenderRecord(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                                       @RequestParam int year, @RequestParam int month) {
        customTrailService.readCalenderRecords(userDetails.getUser(), year, month);
        return null;
    }
}
