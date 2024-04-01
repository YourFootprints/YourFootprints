package org.ssafy.ssafy_sec_proj.trail.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.ssafy.ssafy_sec_proj._common.response.ApiResponseDto;
import org.ssafy.ssafy_sec_proj._common.response.MsgType;
import org.ssafy.ssafy_sec_proj._common.response.ResponseUtils;
import org.ssafy.ssafy_sec_proj._common.security.UserDetailsImpl;
import org.ssafy.ssafy_sec_proj.trail.dto.request.*;
import org.ssafy.ssafy_sec_proj.trail.dto.response.*;
import org.ssafy.ssafy_sec_proj.trail.dto.response.CustomTrailsPublicResponseDto;
import org.ssafy.ssafy_sec_proj.trail.dto.response.RecordListResponseDto;
import org.ssafy.ssafy_sec_proj.trail.dto.response.CustomTrailDetailResponseDto;
import org.ssafy.ssafy_sec_proj.trail.dto.response.CustomTrailsCreateResponseDto;
import org.ssafy.ssafy_sec_proj.trail.entity.SpotLists;
import org.ssafy.ssafy_sec_proj.trail.service.CustomTrailService;
import org.ssafy.ssafy_sec_proj.users.entity.User;

import java.util.List;
import java.util.concurrent.CompletableFuture;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@EnableAsync
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
                                                                    @RequestBody CustomTrailsPublicRequestDto dto) {
        return ResponseUtils.ok(customTrailService.editPublic(userDetails.getUser(), trailsId, dto), MsgType.EDIT_CUSTOM_TRAIL_PUBLIC_SUCCESSFULLY);
    }

    @GetMapping("/main/trails/{trails-id}/lalo-list")
    public ApiResponseDto<CoordinateListResponseDto> clickStaticImg(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                                    @PathVariable("trails-id") Long trailsId) {
        return ResponseUtils.ok(customTrailService.readCorrdinateList(userDetails.getUser(), trailsId), MsgType.GET_RECORD_SUCCESSFULLY);
    }

    @PutMapping("/main/trails/{trails-id}/record")
    public ApiResponseDto<CustomTrailsEditResponseDto> editCustomTrailsRecord(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                                              @PathVariable("trails-id") Long trailsId,
                                                                              @ModelAttribute CustomTrailsEditRequestDto dto) {
        return ResponseUtils.ok(customTrailService.editCustomTrailRecord(userDetails.getUser(), trailsId, dto), MsgType.EDIT_CUSTOM_TRAIL_RECORD_SUCCESSFULLY);
    }

    @GetMapping("/search/trails/list")
    public ApiResponseDto<CustomTrailsListResponseDto> readTrailsList(@RequestParam(required = false) List<String> runtime,
                                                                @RequestParam(required = false) String address
    ) {
        return ResponseUtils.ok(customTrailService.readTrailsList(runtime, address), MsgType.GET_TRAIL_LIST_SUCCESSFULLY);
    }
    @PutMapping("/main/trails/{trails-id}/receive-data")
    public ApiResponseDto<Void> receiveData(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                                    @PathVariable("trails-id") Long trailsId,
                                                                    @RequestBody CustomTrailsReceiveDataRequestDto dto) {
        customTrailService.receiveData(userDetails.getUser(), trailsId, dto);
        return ResponseUtils.ok(MsgType.ADD_SPOT_LIST_SUCCESSFULLY);
    }


    @PutMapping("/{trails-id}/end")
    public ApiResponseDto<Void> endCustomTrail(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                               @PathVariable("trails-id") Long trailsId,
                                               @RequestBody CustomTrailsEndRequestDto dto) {
        List<SpotLists> list = customTrailService.end(userDetails.getUser(), trailsId, dto);
        endPyAsync(list, userDetails.getUser(), trailsId, dto);
        return ResponseUtils.ok(MsgType.END_CUSTOM_TRAIL_SUCCESSFULLY);
    }

    @Async
    public void endPyAsync(List<SpotLists> list, User user, Long trailsId, CustomTrailsEndRequestDto dto) {
        customTrailService.endPy(list, user, trailsId, dto);
    }


    @PutMapping("/main/trails/{trails-id}/end-image")
    public ApiResponseDto<Void> endTrailWithImage(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                  @PathVariable("trails-id") Long trailsId,
                                                  @ModelAttribute("trailsImg") MultipartFile trailsImg) {
        CustomTrailsEndImageRequestDto dto = new CustomTrailsEndImageRequestDto(trailsImg);
        customTrailService.endImage(userDetails.getUser(), trailsId, dto);
        // Returning a success response
        return ResponseUtils.ok(MsgType.END_CUSTOM_TRAIL_WITH_IMAGE_SUCCESSFULLY);
    }
}
