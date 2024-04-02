package org.ssafy.ssafy_sec_proj.trail.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.ssafy.ssafy_sec_proj._common.exception.ErrorType;
import org.ssafy.ssafy_sec_proj._common.response.ApiResponseDto;
import org.ssafy.ssafy_sec_proj._common.response.MsgType;
import org.ssafy.ssafy_sec_proj._common.response.ResponseUtils;
import org.ssafy.ssafy_sec_proj._common.security.UserDetailsImpl;
import org.ssafy.ssafy_sec_proj.trail.dto.response.TrailsAroundFacilityResponseDto;
import org.ssafy.ssafy_sec_proj.trail.entity.TrailsAroundFacility;
import org.ssafy.ssafy_sec_proj.trail.repository.CustomTrailsRepository;
import org.ssafy.ssafy_sec_proj.trail.service.CustomTrailService;
import org.ssafy.ssafy_sec_proj.trail.service.TrailsAroundFacilityService;
import org.ssafy.ssafy_sec_proj.users.entity.User;
import org.ssafy.ssafy_sec_proj.users.service.UserService;

import javax.ws.rs.Path;
import java.io.IOException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TrailsAroundFacilityController {
    private final CustomTrailService customTrailService;
    private final TrailsAroundFacilityService trailsAroundFacilityService;
    private final UserService userService;

//    @PostMapping("/search/trails/list/{trails-id}/detail/static")
//    public ApiResponseDto<TrailsAroundFacilityResponseDto> readAroundFacility(@AuthenticationPrincipal UserDetailsImpl userDetails,
//                                                                              @PathVariable("trails-id") Long trailsId) throws IOException {
//        return ResponseUtils.ok(trailsAroundFacilityService.readAroundFacility(userDetails.getUser(), trailsId), MsgType.DATA_SUCCESSFULLY);
//    }

    @GetMapping("/search/trails/list/{trails-id}/detail/static")
    public ApiResponseDto<TrailsAroundFacilityResponseDto> readAroundFacility(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                                              @PathVariable("trails-id") Long trailsId) throws IOException {
        return ResponseUtils.ok(trailsAroundFacilityService.readAroundFacility(userDetails.getUser(), trailsId), MsgType.DATA_SUCCESSFULLY);
    }


}
