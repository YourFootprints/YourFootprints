package org.ssafy.ssafy_sec_proj.trail.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.ssafy.ssafy_sec_proj._common.response.ApiResponseDto;
import org.ssafy.ssafy_sec_proj._common.response.MsgType;
import org.ssafy.ssafy_sec_proj._common.response.ResponseUtils;
import org.ssafy.ssafy_sec_proj._common.security.UserDetailsImpl;
import org.ssafy.ssafy_sec_proj.trail.dto.response.MainResponseDto;
import org.ssafy.ssafy_sec_proj.trail.service.UserTrailsRecordService;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserTrailsRecordController {
    private final UserTrailsRecordService userTrailsRecordService;

    @GetMapping("/main")
    public ApiResponseDto<MainResponseDto> getMainPage(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseUtils.ok(userTrailsRecordService.readMaingPage(userDetails.getUser()), MsgType.GET_MAIN_PAGE);
    }
}
