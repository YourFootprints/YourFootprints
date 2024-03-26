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
    GET_CALENDER_RECORD_SUCCESSFULLY("캘린더 기록 조회 성공"),
    ADD_LIKE_LIST_SUCCESSFULLY("찜하기 성공"),
    DELETE_LIKE_LIST_SUCCESSFULLY("찜 삭제하기 성공"),
    GET_RECORD_SUCCESSFULLY("산책 기록 조회 성공"),
    GET_STATIC_IMG_SPOTLIST_SUCCESSFULLY("정적 이미지 좌표 조회 성공"),
    CREATE_TRAILS_SUCCESSFULLY("산책 시작 성공"),
    EDIT_CUSTOM_TRAIL_PUBLIC_SUCCESSFULLY("공개 여부 변경 성공"),
    EDIT_CUSTOM_TRAIL_RECORD_SUCCESSFULLY("산책 후 편집 성공"),
    SEARCH_DONG_NAME_LIST_SUCCESSFULLY("행정동 리스트 찾기 성공"),
    ADD_SPOT_LIST_SUCCESSFULLY("스팟 데이터 받기 성공"),
    ;

    private final String msg;

    MsgType(String msg) {
        this.msg = msg;
    }
}
