package org.ssafy.ssafy_sec_proj.trail.service;

import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.ssafy.ssafy_sec_proj._common.exception.CustomException;
import org.ssafy.ssafy_sec_proj._common.exception.ErrorType;
import org.ssafy.ssafy_sec_proj.ranking.entity.Footsteps;
import org.ssafy.ssafy_sec_proj.ranking.entity.RecommendTrails;
import org.ssafy.ssafy_sec_proj.ranking.repository.FootstepsRepository;
import org.ssafy.ssafy_sec_proj.ranking.repository.RecommendTrailsRepository;
import org.ssafy.ssafy_sec_proj.trail.dto.response.MainResponseDto;
import org.ssafy.ssafy_sec_proj.trail.dto.response.RecordResponseDto;
import org.ssafy.ssafy_sec_proj.trail.entity.CustomTrails;
import org.ssafy.ssafy_sec_proj.trail.repository.CustomTrailsRepository;
import org.ssafy.ssafy_sec_proj.trail.repository.TrailsAroundFacilityRepository;
import org.ssafy.ssafy_sec_proj.users.entity.RecUsers;
import org.ssafy.ssafy_sec_proj.users.entity.TrailsMidLikes;
import org.ssafy.ssafy_sec_proj.users.entity.User;
import org.ssafy.ssafy_sec_proj.users.repository.RecUsersRepository;
import org.ssafy.ssafy_sec_proj.users.repository.TrailsMidLikesRepository;
import org.ssafy.ssafy_sec_proj.users.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class UserTrailsRecordService {
    private final UserRepository userRepository;
    private final CustomTrailsRepository customTrailsRepository;
    private final TrailsMidLikesRepository trailsMidLikesRepository;
    private final RecUsersRepository recUsersRepository;
    private final RecommendTrailsRepository recommendTrailsRepository;
    private final FootstepsRepository footstepsRepository;

    public MainResponseDto readMaingPage(User user){
        // 유효한 사용자인지 체크
        if (userRepository.findByIdAndDeletedAtIsNull(user.getId()).isEmpty()){
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }
        // 유저의 시도, 시군구
//        String sido = user.getVisitedLocation().split(" ")[0];
//        String sigungo = user.getVisitedLocation().split(" ")[1];
        String sido = "경상북도";
        String sigungo = "구미시";
        System.out.println(sido);
        // 산책기록 체크
        List<CustomTrails> customeTrilsList= customTrailsRepository.findAllByUserIdAndDeletedAtIsNull(user).orElse(null);

        String accumulatedWalkingTime = "0:00:00";
        double accumulatedDistance = 0;
        int accumulatedFootstep = 0;
        List<RecordResponseDto> aroundTrailsRecommend = customTrailsRepository.findTop5ByIsPublicIsTrueAndSiDoAndSiGunGoAndDeletedAtIsNullOrderByLikeNumDesc(sido, sigungo)
                .orElse(null).stream()
                .map(c -> RecordResponseDto.of(
                        c.getId(),
                        c.getTrailsImg(),
                        transferRuntime(c.getRuntime()),
                        c.getDistance(),
                        c.getLikeNum(),
                        c.getSiGunGo() + " " + c.getEupMyeonDong(),
                        checkIsLike(user, c)
                )).toList();
//        List<RecordResponseDto> safeTrailsRecommend = new ArrayList<>();


        List<RecordResponseDto> safeTrailsRecommend = customTrailsRepository.findTop5ByIsPublicIsTrueAndSiDoAndSiGunGoAndDeletedAtIsNull(sido, sigungo)
                    .orElse(null).stream()
                    .map(c -> RecordResponseDto.of(
                            c.getId(),
                            c.getTrailsImg(),
                            transferRuntime(c.getRuntime()),
                            c.getDistance(),
                            c.getLikeNum(),
                            c.getSiGunGo() + " " + c.getEupMyeonDong(),
                            checkIsLike(user, c)
                    )).toList();

        // 산책 기록 있으면 추천
        if (!customeTrilsList.isEmpty()) {
            // 이번 달 산책 기록 체크 => 있으면 더한 값 반환
            int currentMonth = LocalDateTime.now().getMonthValue();
            List<CustomTrails> currentList = customTrailsRepository.findAllCustomTrailsByCreatedAtAndDeletedAtIsNull(currentMonth).orElse(null);

            // 이번 달 산책 기록이 있다면
            if (!currentList.isEmpty()) {
                // 순회하면서 더해주기
                int totalRuntime = 0 ;
                for (CustomTrails customTrail : currentList) {
                    totalRuntime += transferRuntimeToSec(customTrail.getRuntime());
                    accumulatedDistance  += customTrail.getDistance();
                }

                int hours = totalRuntime / 3600;
                int minutes = (totalRuntime % 3600) / 60;
                int seconds = totalRuntime % 60;

                // 시간을 문자열로 변환
                accumulatedWalkingTime = String.format("%01d:%02d:%02d", hours, minutes, seconds);

                // 총 발자국 개수
                List<Footsteps> footstepsList = footstepsRepository.findAllByUserIdAndCreatedAt(user.getId(), currentMonth);
                accumulatedFootstep = footstepsList.size();

            }
            // 추천 목록 가져오기 : 군집 번호로 가져와서 그 중 좋아요 높은 순
            RecUsers recUsers = recUsersRepository.findByIdAndDeletedAtIsNull(user.getId())
                    .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_RECUSER));

            // requestBody 데이터 설정
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("cafe_num", recUsers.getCafeNum());
            requestBody.put("cctv_num", recUsers.getCctvNum());
            requestBody.put("convenience_num", recUsers.getConvenienceNum());
            requestBody.put("police_num", recUsers.getPoliceNum());
            requestBody.put("restaurant_num", recUsers.getRestaurantNum());
            requestBody.put("gender", user.getGender());
            requestBody.put("age_range", user.getAgeRange());
            requestBody.put("prefer_duration_e", user.getPreferDurationE());
            requestBody.put("prefer_duration_s", user.getPreferDurationS());
            requestBody.put("sum_num", recUsers.getSumNum());

            // HTTP 헤더 설정
            HttpHeaders headers =  new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

            // RestTemplate을 통해 POST 요청 보내기
            RestTemplate restTemplate = new RestTemplate();
            String url = "http://j10d207a.p.ssafy.io:8001/data/predict-cluster"; // FastAPI 서버의 엔드포인트 URL

            // fastapi 요철 예외 처리
            try {
                ResponseEntity<Map<String, List<Long>>> responseEntity = restTemplate.exchange(
                        url,
                        HttpMethod.POST,
                        requestEntity,
                        new ParameterizedTypeReference<Map<String, List<Long>>>() {});

                // 응답 확인
                if (responseEntity.getStatusCode() == HttpStatus.OK) {
                    Map<String, List<Long>> responseBody = responseEntity.getBody();
                    List<Long> cluster = responseBody.get("cluster");
                    // trails list 뽑기
                    List<RecommendTrails> recommendTrailsList= recommendTrailsRepository.findAllByClusterAndDeletedAtIsNull(cluster.get(0)).orElse(null);

                    List<Long> trailsIdList = recommendTrailsList.stream()
                            .map(RecommendTrails::getTrailsId)
                            .toList();

                    aroundTrailsRecommend = new ArrayList<>();
                    aroundTrailsRecommend.addAll(customTrailsRepository.findAllByIdAndDeletedAtIsNullOrderByLikeNum(trailsIdList, sido, sigungo)
                            .orElse(null).stream()
                            .map(c -> RecordResponseDto.of(
                                    c.getId(),
                                    c.getTrailsImg(),
                                    transferRuntime(c.getRuntime()),
                                    c.getDistance(),
                                    c.getLikeNum(),
                                    c.getSiGunGo() + " " + c.getEupMyeonDong(),
                                    checkIsLike(user, c)
                            )).toList());


                } else {
                    System.out.println("요청 실패: " + responseEntity.getStatusCode());
                }
            } catch (RestClientException e) {
                e.printStackTrace();
            }

        }

        MainResponseDto responseDto = MainResponseDto.of(user.getKakaoProfileImg(), user.getNickName(),
                accumulatedWalkingTime, accumulatedDistance, accumulatedFootstep, aroundTrailsRecommend, safeTrailsRecommend);

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
