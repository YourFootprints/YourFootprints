package org.ssafy.ssafy_sec_proj.trail.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.ssafy.ssafy_sec_proj._common.response.ApiResponseDto;
import org.ssafy.ssafy_sec_proj._common.response.MsgType;
import org.ssafy.ssafy_sec_proj._common.response.ResponseUtils;
import org.ssafy.ssafy_sec_proj._common.security.UserDetailsImpl;
import org.ssafy.ssafy_sec_proj.trail.dto.response.CalenderRecordListResponseDto;
import org.ssafy.ssafy_sec_proj.trail.dto.response.CustomTrailDetailResponseDto;
import org.ssafy.ssafy_sec_proj.trail.service.CustomTrailService;

import java.time.LocalDate;

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

    @GetMapping("/main/calendar/records")
    public ApiResponseDto<CalenderRecordListResponseDto> getCalenderRecord(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                                           @RequestParam int year, @RequestParam int month) {
        return ResponseUtils.ok(customTrailService.readCalenderRecords(userDetails.getUser(), year, month), MsgType.GET_CALENDER_RECORD_SUCCESSFULLY);
    }
}
