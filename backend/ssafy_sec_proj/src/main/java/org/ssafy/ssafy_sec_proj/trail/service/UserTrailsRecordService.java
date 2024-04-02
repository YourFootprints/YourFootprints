package org.ssafy.ssafy_sec_proj.trail.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.ssafy_sec_proj._common.exception.CustomException;
import org.ssafy.ssafy_sec_proj._common.exception.ErrorType;
import org.ssafy.ssafy_sec_proj.trail.dto.response.MainResponseDto;
import org.ssafy.ssafy_sec_proj.trail.dto.response.RecordResponseDto;
import org.ssafy.ssafy_sec_proj.trail.entity.CustomTrails;
import org.ssafy.ssafy_sec_proj.trail.repository.CustomTrailsRepository;
import org.ssafy.ssafy_sec_proj.users.entity.TrailsMidLikes;
import org.ssafy.ssafy_sec_proj.users.entity.User;
import org.ssafy.ssafy_sec_proj.users.repository.TrailsMidLikesRepository;
import org.ssafy.ssafy_sec_proj.users.repository.UserRepository;

import org.springframework.http.HttpHeaders;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UserTrailsRecordService {
    private final UserRepository userRepository;
    private final CustomTrailsRepository customTrailsRepository;
    private final TrailsMidLikesRepository trailsMidLikesRepository;

    public MainResponseDto readMaingPage(User user){
        // 유효한 사용자인지 체크
        if (userRepository.findByIdAndDeletedAtIsNull(user.getId()).isEmpty()){
            throw  new CustomException(ErrorType.NOT_FOUND_USER);
        }
        // 산책기록 체크
        List<CustomTrails> customeTrilsList= customTrailsRepository.findAllByUserIdAndDeletedAtIsNull(user).orElse(null);

        String accumulatedWalkingTime = "0:00:00";
        double accumulatedDistance = 0;
        int accumulatedCalorie = 0;
        List<RecordResponseDto> aroundTrailsRecommend = new ArrayList<>();

        // 산책 기록 없으면 => 아직 산책 기록이 없어요, 좋아요순 정렬
        if (customeTrilsList.isEmpty()) {
            aroundTrailsRecommend.addAll(customTrailsRepository.findAllByIsPublicIsTrueAndDeletedAtIsNullOrderByLikeNumDesc()
                    .orElse(null).stream()
                    .map(c -> RecordResponseDto.of(
                            c.getId(),
                            c.getTrailsImg(),
                            transferRuntime(c.getRuntime()),
                            c.getDistance(),
                            c.getLikeNum(),
                            c.getSiGunGo() + " " + c.getEupMyeonDong(),
                            checkIsLike(c.getUserId(), c)
                    )).toList());
        } else {
            // 이번 달 산책 기록이 체크 => 있으면 더한 값 반환
            int currentMonth = LocalDateTime.now().getMonthValue();
            List<CustomTrails> currentList = customTrailsRepository.findAllCustomTrailsByCreatedAtAndDeletedAtIsNull(currentMonth).orElse(null);

            // 이번 달 산책 기록이 있다면
            if (!currentList.isEmpty()) {
                // 순회하면서 더해주기
                int totalRuntime = 0 ;
                for (CustomTrails customTrail : currentList) {
                    totalRuntime += transferRuntimeToSec(customTrail.getRuntime());
                    accumulatedDistance  += customTrail.getDistance();
                    accumulatedCalorie += customTrail.getCalorie();
                }

                int hours = totalRuntime / 3600;
                int minutes = (totalRuntime % 3600) / 60;
                int seconds = totalRuntime % 60;

                // 시간을 문자열로 변환
                accumulatedWalkingTime = String.format("%01d:%02d:%02d", hours, minutes, seconds);

            }
            // 추천 목록 가져오기 : 군집 번호로 가져와서 그 중 좋아요 높은 순
            /*
            fastapi 연결
            cafe_num : int
            cctv_num :  int
            convenience_num : int
            police_num : int
            restaurant_num : int
            gender : str
            age_range :str
            prefer_duration_e : int
            prefer_duration_s : int
            sum_num : int
             */
            HttpHeaders headers =  new HttpHeaders();
        }


        MainResponseDto responseDto = MainResponseDto.of(user.getKakaoProfileImg(), user.getNickName(),
                accumulatedWalkingTime, accumulatedDistance,accumulatedCalorie, aroundTrailsRecommend);

        return responseDto;
    }

    // runtime 분 단위로 변환하는 메서드
    public int transferRuntime(String runtime) {
        String[] times = runtime.split(":");
        return Integer.parseInt(times[0]) * 60 + Integer.parseInt(times[1]);
    }

    // runtime 초 단위로 변환하는 메서드
    public int transferRuntimeToSec(String runtime) {
        String[] times = runtime.split(":");
        return Integer.parseInt(times[0]) * 3600 + Integer.parseInt(times[1]) * 60 + + Integer.parseInt(times[2]);
    }


    // 좋아요 여부 판단 : id와 user로 midlikes에 있는지 체크
    public boolean checkIsLike(User user, CustomTrails customTrails) {
        TrailsMidLikes trailsMidLikes = trailsMidLikesRepository.findByUserIdAndTrailsIdAndDeletedAtIsNull(user, customTrails);
        if (trailsMidLikes == null){
            return false;
        } else {
            return true;
        }
    }

}
