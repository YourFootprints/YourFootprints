package org.ssafy.ssafy_sec_proj.users.controller;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.ssafy.ssafy_sec_proj._common.infra.oauth.entity.OauthToken;
import org.ssafy.ssafy_sec_proj._common.response.ApiResponseDto;
import org.ssafy.ssafy_sec_proj._common.response.MsgType;
import org.ssafy.ssafy_sec_proj._common.response.ResponseUtils;
import org.ssafy.ssafy_sec_proj._common.security.UserDetailsImpl;
import org.ssafy.ssafy_sec_proj.users.entity.User;
import org.ssafy.ssafy_sec_proj.users.service.UserSignupService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserSignupController {

    private final UserSignupService userSignupService;

// 프론트에서 인가코드 돌려 받는 주소
// 인가 코드로 엑세스 토큰 발급 -> 사용자 정보 조회 -> DB 저장 -> jwt 토큰 발급 -> 프론트에 토큰 전달

    @GetMapping("/oauth/callback/kakao/token")
    public ApiResponseDto<Map<String, Boolean>> getAccessToken(@RequestParam(value = "code", required = false) String code, HttpServletResponse response){
        return handleAccessTokenRequest(code, "http://localhost:8080/api/oauth/callback/kakao/token", response);
    }

    @GetMapping("/oauth/callback/kakao/token/l-t-d")
    public ApiResponseDto<Map<String, Boolean>> getAccessTokenLocalToDist(@RequestParam(value = "code", required = false) String code, HttpServletResponse response){
        return handleAccessTokenRequest(code, "http://localhost:3000/oauth/callback/kakao/token", response);
    }

    @GetMapping("/oauth/callback/kakao/token/l-t-l")
    public ApiResponseDto<Map<String, Boolean>> getAccessTokenLocalToLocal(@RequestParam(value = "code", required = false) String code, HttpServletResponse response){
        return handleAccessTokenRequest(code, "http://localhost:3000/oauth/callback/kakao/token", response);
    }

    @GetMapping("/oauth/callback/kakao/token/d-t-d")
    public ApiResponseDto<Map<String, Boolean>> getAccessTokenDistToDist(@RequestParam(value = "code", required = false) String code, HttpServletResponse response){
        return handleAccessTokenRequest(code, "https://i10d110.p.ssafy.io/oauth/callback/kakao/token", response);
    }

    @GetMapping("/oauth/callback/kakao/token/d-t-l")
    public ApiResponseDto<Map<String, Boolean>> getAccessTokenDistToLocal(@RequestParam(value = "code", required = false) String code, HttpServletResponse response){
        return handleAccessTokenRequest(code, "https://i10d110.p.ssafy.io/oauth/callback/kakao/token", response);
    }

    private ApiResponseDto<Map<String, Boolean>> handleAccessTokenRequest(String code, String redirectUri, HttpServletResponse response) {
        System.out.println("code : " + code);
        OauthToken oauthToken = userSignupService.getAccessToken(code, redirectUri);
        List<String> ans = userSignupService.SaveUserAndGetToken(oauthToken.getAccess_token(), response);
        String jwtToken = ans.get(0);
        boolean isFirst = ans.get(1).equals("true");

        Map<String, Boolean> ret = new HashMap<>();
        boolean test = Math.random() < 0.5;
        System.out.println("랜덤값 몇이야? 0.5 이하면 true가 된다 " + test);
        ret.put("isFirst", isFirst);
        System.out.println("첫 가입인가? : " + isFirst);
        return ResponseUtils.ok(ret, MsgType.GENERATE_TOKEN_SUCCESSFULLY);
    }


    // jwt 토큰으로 유저정보 요청하기
    @GetMapping("/me")
    public ApiResponseDto<String> getCurrentUser(@AuthenticationPrincipal UserDetailsImpl userDetails) {

        User user = userSignupService.getUser(userDetails.getUser());

        System.out.println("user : " + user);
        return ResponseUtils.ok("유저 : " + user.getUserName() + "\n카카오 이메일 : " + user.getKakaoEmail(), MsgType.SEARCH_SUCCESSFULLY);
    }
}