package org.ssafy.ssafy_sec_proj.trail.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.ssafy.ssafy_sec_proj._common.dto.request.CoordinateRequestDto;
import org.ssafy.ssafy_sec_proj._common.repository.DongGeoRepository;
import org.ssafy.ssafy_sec_proj._common.response.ApiResponseDto;
import org.ssafy.ssafy_sec_proj._common.response.MsgType;
import org.ssafy.ssafy_sec_proj._common.response.ResponseUtils;
import org.ssafy.ssafy_sec_proj._common.security.UserDetailsImpl;
import org.ssafy.ssafy_sec_proj.trail.dto.response.CustomTrailDetailResponseDto;
import org.ssafy.ssafy_sec_proj.trail.service.TrailsRecordService;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TrailsRecordController {

    private final TrailsRecordService trailsRecordService;

    @PostMapping("/find-dong/coordinate")
    public ApiResponseDto<String> getCustomTrailDetail(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody CoordinateRequestDto dto) {
        return ResponseUtils.ok(trailsRecordService.findDongByXY(userDetails.getUser(), dto), MsgType.SEARCH_CUSTOM_TRAIL_DETAIL_SUCCESSFULLY);
    }
}
