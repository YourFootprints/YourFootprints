package org.ssafy.ssafy_sec_proj._common.response;

import lombok.Getter;

@Getter
public enum MsgType {

    SIGNUP_SUCCESSFULLY("회원가입이 완료되었습니다."),
    LOGIN_SUCCESSFULLY("로그인이 완료되었습니다."),
    SEARCH_SUCCESSFULLY("조회 성공"),
    DATA_SUCCESSFULLY("데이터 생성 성공"),
    GENERATE_TOKEN_SUCCESSFULLY("토큰 생성 성공"),
    SEARCH_EMAIL_SUCCESSFULLY("이메일 조회 성공"),
    SEARCH_MY_PROFILE_DATA_SUCCESSFULLY("본인 프로필 데이터 조회 성공"),
    UPDATE_USER_PROFILE_DATA_SUCCESSFULLY("유저 프로필 데이터 업데이트 성공"),
    SEARCH_USER_DATA_SUCCESSFULLY("유저 데이터 찾기 성공"),
    CCTV_DATA_SUCCESSFULLY("CCTV데이터 생성 성공"),
    SEARCH_CUSTOM_TRAIL_DETAIL_SUCCESSFULLY("산책 기록 상세 조회 성공"),
    GET_PROFILE_SUCCESSFULLY("프로필 데이터 불러오기 성공"),
    EDIT_PROFILE_SUCCESSFULLY("프로필 편집 성공"),
    ;

    private final String msg;

    MsgType(String msg) {
        this.msg = msg;
    }
}
