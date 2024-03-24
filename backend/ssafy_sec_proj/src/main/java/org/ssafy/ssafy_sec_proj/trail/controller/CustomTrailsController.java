package org.ssafy.ssafy_sec_proj.trail.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.ssafy.ssafy_sec_proj._common.response.ApiResponseDto;
import org.ssafy.ssafy_sec_proj._common.response.MsgType;
import org.ssafy.ssafy_sec_proj._common.response.ResponseUtils;
import org.ssafy.ssafy_sec_proj._common.security.UserDetailsImpl;
import org.ssafy.ssafy_sec_proj.trail.dto.request.CustomTrailsCreateRequestDto;
import org.ssafy.ssafy_sec_proj.trail.dto.request.CustomTrailsPublicRequestDto;
import org.ssafy.ssafy_sec_proj.trail.dto.response.CustomTrailsPublicResponseDto;
import org.ssafy.ssafy_sec_proj.trail.dto.response.RecordListResponseDto;
import org.ssafy.ssafy_sec_proj.trail.dto.response.CustomTrailDetailResponseDto;
import org.ssafy.ssafy_sec_proj.trail.dto.response.CustomTrailsCreateResponseDto;
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

    @GetMapping("/main/calendar/records")
    public ApiResponseDto<RecordListResponseDto> getCalenderRecord(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                                   @RequestParam int year, @RequestParam int month) {
        return ResponseUtils.ok(customTrailService.readCalenderRecords(userDetails.getUser(), year, month), MsgType.GET_CALENDER_RECORD_SUCCESSFULLY);
    }

    @PostMapping("/main/trails")
    public ApiResponseDto<CustomTrailsCreateResponseDto> createCustomTrail(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                                           @RequestBody CustomTrailsCreateRequestDto dto) {
        return ResponseUtils.ok(customTrailService.createCustomTrail(dto, userDetails.getUser()), MsgType.CREATE_TRAILS_SUCCESSFULLY);
    }

    @GetMapping("/main/trails/records")
    public ApiResponseDto<RecordListResponseDto> getRecord(@AuthenticationPrincipal UserDetailsImpl userDetails){
        return ResponseUtils.ok(customTrailService.readRecords(userDetails.getUser()), MsgType.GET_RECORD_SUCCESSFULLY);
    }

    @PutMapping("/main/trails/{trails-id}/public")
    public ApiResponseDto<CustomTrailsPublicResponseDto> editPublic(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                                    @PathVariable("trails-id") Long trailsId,
                                                                    @RequestBody CustomTrailsPublicRequestDto dto){
        return ResponseUtils.ok(customTrailService.editPublic(userDetails.getUser(), trailsId, dto), MsgType.EDIT_CUSTOM_TRAIL_PUBLIC_SUCCESSFULLY);
    }
}
