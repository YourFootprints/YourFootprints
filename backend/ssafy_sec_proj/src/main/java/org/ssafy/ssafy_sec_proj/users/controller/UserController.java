package org.ssafy.ssafy_sec_proj.users.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.ssafy.ssafy_sec_proj._common.response.ApiResponseDto;
import org.ssafy.ssafy_sec_proj._common.response.MsgType;
import org.ssafy.ssafy_sec_proj._common.response.ResponseUtils;
import org.ssafy.ssafy_sec_proj._common.security.UserDetailsImpl;
import org.ssafy.ssafy_sec_proj.users.dto.request.UserAddLikeListRequestDto;
import org.ssafy.ssafy_sec_proj.users.dto.request.UserAddSignUpInfoRequestDto;
import org.ssafy.ssafy_sec_proj.users.dto.request.UserProfileEditRequestDto;
import org.ssafy.ssafy_sec_proj.users.dto.response.UserProfileEditResponseDto;
import org.ssafy.ssafy_sec_proj.users.dto.response.UserProfileGetResponseDto;
import org.ssafy.ssafy_sec_proj.users.service.UserService;

import java.io.IOException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/users/profile")
    public ApiResponseDto<UserProfileGetResponseDto> getProfile(@AuthenticationPrincipal UserDetailsImpl userDetails) {

        return ResponseUtils.ok(userService.getProfile(userDetails.getUser()), MsgType.GET_PROFILE_SUCCESSFULLY);
    }

    @PutMapping("users/profile/edit")
    public ApiResponseDto<UserProfileEditResponseDto> editProfile(@AuthenticationPrincipal UserDetailsImpl userDetails, @ModelAttribute UserProfileEditRequestDto dto) throws IOException {

        return ResponseUtils.ok(userService.editProfile(userDetails.getUser(), dto), MsgType.EDIT_PROFILE_SUCCESSFULLY);
    }

    @PostMapping("users/add-like-list")
    public ApiResponseDto<Void> addLikeList(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody UserAddLikeListRequestDto dto) {

        userService.addLikeList(userDetails.getUser(), dto);
        return ResponseUtils.ok(MsgType.ADD_LIKE_LIST_SUCCESSFULLY);
    }

    @DeleteMapping("users/delete-like-list/{trails-id}")
    public ApiResponseDto<Void> deleteLikeList(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable(name = "trails-id") Long trailsId) {

        userService.deleteLikeList(userDetails.getUser(), trailsId);
        return ResponseUtils.ok(MsgType.DELETE_LIKE_LIST_SUCCESSFULLY);
    }

    @PutMapping("users/remain-info")
    public ApiResponseDto<Void> addSignUpInfo(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody UserAddSignUpInfoRequestDto dto) {

        userService.userAddSignUpInfo(userDetails.getUser(), dto);
        return ResponseUtils.ok(MsgType.USER_ADD_SIGNUP_INFO_SUCCESSFULLY);
    }
}
