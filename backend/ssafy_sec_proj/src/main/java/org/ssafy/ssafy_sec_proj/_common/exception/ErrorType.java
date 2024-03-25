package org.ssafy.ssafy_sec_proj._common.exception;

import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Getter
public enum ErrorType {

    //----------------------- 유저 관련 부분------------------------------
    CONTENT_IS_NULL(400, "입력되지 않은 정보가 있습니다."),
    DUPLICATED_USERID(400, "중복된 아이디입니다."),
    FAILED_TO_ACQUIRE_LOCK(100, "락 권한을 얻는데 실패했습니다."),
    NOT_FOUND_PARK_TYPE(400, "유효하지 않은 값입니다."),
    NOT_FOUND_USER(401, "등록된 사용자가 없습니다."),
    NOT_MATCHING_INFO(401, "아이디 또는 비밀번호를 잘못 입력했습니다."),
    NOT_TOKEN(401, "토큰이 없습니다."),
    NOT_VALID_TOKEN(401, "토큰이 유효하지 않습니다."),
    NOT_FOUND_PROFILE_IMG(401, "프로필 사진을 추가해 주세요"),
    NOT_FOUND_BACK_IMG(401, "배경사진을 추가해 주세요"),
    //--------------------------------------------------------------------
    //---------------------------산책 기록 관련 부분----------------------------
    NOT_FOUND_TRAIL(404, "등록된 산책 기록이 없습니다."),
    ALREADY_EXIST_CUSTOM_TRAILS_PUBLIC(401, "이미 처리한 공개 여부 편집 요청입니다."),
    NOT_FOUND_SPOT_LIST(401, "산책 좌표 정보를 찾을 수 없습니다."),
    NOT_MATCHING_USER(401, "등록된 사용자와 일치하지 않습니다."),
    //--------------------------------------------------------------------
    //---------------------------산책로 관련 부분----------------------------
    NOT_FOUND_TRAILS(401, "해당 산책로가 존재하지 않습니다."),
    //--------------------------------------------------------------------
    //---------------------------찜하기 관련 부분----------------------------
    ALREADY_EXIST_TRAILS_MID_LIKES(401, "이미 찜을 한 산책로입니다."),
    NOT_FOUND_TRAILS_MID_LIKES(401, "아직 찜을 하지 않은 산책로입니다."),
    //--------------------------------------------------------------------
    //---------------------------좌표 찾기 관련 부분-------------------------
    NOT_FOUND_DONG(401, "해당 좌표의 행정동을 찾지 못했습니다."),
    ;

    private int code;
    private String msg;

    ErrorType(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public static ErrorType printLocalDateTimeList(List<LocalDateTime> notAllowedTimeList) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        List<String> dateTimeStrings = notAllowedTimeList.stream()
                .map(dateTime -> dateTime.format(formatter))
                .toList();

        ErrorType errorType = FAILED_TO_ACQUIRE_LOCK;
        errorType.msg = "입차 불가한 시간대가 있습니다.\n" + dateTimeStrings;
        return errorType;
    }
}
