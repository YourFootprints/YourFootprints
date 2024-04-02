package org.ssafy.ssafy_sec_proj.ranking.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.ssafy_sec_proj._common.exception.CustomException;
import org.ssafy.ssafy_sec_proj._common.exception.ErrorType;
import org.ssafy.ssafy_sec_proj.ranking.dto.responseDto.FootstepListResponseDto;
import org.ssafy.ssafy_sec_proj.ranking.dto.responseDto.WeekRankingListResponseDto;
import org.ssafy.ssafy_sec_proj.ranking.entity.Footsteps;
import org.ssafy.ssafy_sec_proj.ranking.repository.FootstepsRepository;
import org.ssafy.ssafy_sec_proj.trail.entity.SpotLists;
import org.ssafy.ssafy_sec_proj.trail.repository.SpotListsRepository;
import org.ssafy.ssafy_sec_proj.users.entity.User;
import org.ssafy.ssafy_sec_proj.users.repository.UserRepository;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class RankingService {

    private final SpotListsRepository spotListsRepository;
    private final FootstepsRepository footstepsRepository;
    private final UserRepository userRepository;

    public List<FootstepListResponseDto> findMyFootstep(User user) {

        List<Footsteps> myFootsteps = footstepsRepository.findAllByUserId(user.getId());

        List<FootstepListResponseDto> ansDtos = new ArrayList<>();
        for (Footsteps f : myFootsteps) {
            ansDtos.add(FootstepListResponseDto.of(user.getId(), user.getUserName(), f.getVisitedNum(), f.getUserImgUrl(), f.getLatitude(), f.getLongitude()));
        }
        return ansDtos;
    }

    public List<FootstepListResponseDto> findDongFootstep(User user) {
        List<FootstepListResponseDto> ansDtos = new ArrayList<>();

        List<Footsteps> footstepsList = footstepsRepository.findAllByAddress(user.getVisitedLocation());

        for (Footsteps f : footstepsList) {
            User footstepUser = userRepository.findByIdAndDeletedAtIsNull(f.getUserId()).orElseThrow(
                    () -> new CustomException(ErrorType.NOT_FOUND_USER)
            );
            ansDtos.add(FootstepListResponseDto.of(footstepUser.getId(), footstepUser.getNickName(), f.getVisitedNum(), f.getUserImgUrl(), f.getLatitude(), f.getLongitude()));
        }
        return ansDtos;
    }

    public List<WeekRankingListResponseDto> findWeekRanking(User user) {
        List<WeekRankingListResponseDto> list = new ArrayList<>();
        List<FootstepListResponseDto> dongList = findDongFootstep(user);

        Map<Long, Integer> userVisitedNum = new HashMap<>();
        for (FootstepListResponseDto f : dongList) {
            // 해당 유저의 방문 횟수를 가져옴
            Integer visitedCount = userVisitedNum.get(f.getUserId());
            if (visitedCount == null) {
                // 해당 유저의 방문 횟수가 없으면 0으로 초기화
                visitedCount = 0;
            }
            // 기존 값에 1을 더함
            userVisitedNum.put(f.getUserId(), visitedCount + 1);
        }

        for (Map.Entry<Long, Integer> entry : userVisitedNum.entrySet()) {
            User nowUser = userRepository.findByIdAndDeletedAtIsNull(entry.getKey()).orElseThrow(
                    () -> new CustomException(ErrorType.NOT_FOUND_USER)
            );
            list.add(WeekRankingListResponseDto.of(nowUser.getUserName(), nowUser.getKakaoProfileImg(), entry.getValue()));
        }

        Collections.sort(list);

        for (int i = 1; i < list.size() + 1; i++) {
            list.get(i - 1).updateRank(i);
        }

        return list;
    }

    public void makeFootstep() {
        footstepsRepository.deleteAllInBatch();
        LocalTime fiveMinutesAgo = LocalTime.of(0, 0, 5);
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusWeeks(8);
        List<SpotLists> spotLists = spotListsRepository.findByDurationGreaterThanEqualAndCreatedAtAfterAndDeletedAtIsNull(fiveMinutesAgo, oneWeekAgo);

        // la와 lo가 같은 위치에 대해 유저별로 몇 번 지나갔는지 카운트
        Map<String, Map<Long, Integer>> locationCountMap = new HashMap<>();
        // 각 좌표별로 유저 정보와 이미지 URL을 저장하기 위한 맵
        Map<String, Map<Long, String>> locationUserImageMap = new HashMap<>();

        for (SpotLists spotList : spotLists) {
            String locationKey = spotList.getLa() + "," + spotList.getLo();
            long userId = spotList.getCustomTrailsId().getUserId().getId();
            String userImgUrl = spotList.getCustomTrailsId().getUserId().getKakaoProfileImg();

            // 각 좌표별로 유저 정보와 이미지 URL을 저장
            locationUserImageMap.putIfAbsent(locationKey, new HashMap<>());
            locationUserImageMap.get(locationKey).put(userId, userImgUrl);

            // 좌표별로 유저별 지나간 횟수 카운트
            locationCountMap.putIfAbsent(locationKey, new HashMap<>());
            locationCountMap.get(locationKey).merge(userId, 1, Integer::sum);
        }

        // Footsteps 엔티티에 데이터 저장 (n명 이상이 지나간 위치만 저장)
        int N = 3;
        for (Map.Entry<String, Map<Long, Integer>> entry : locationCountMap.entrySet()) {
            int totalVisited = entry.getValue().values().stream().mapToInt(Integer::intValue).sum();
            if (totalVisited >= N) {
                String[] location = entry.getKey().split(",");
                double latitude = Double.parseDouble(location[0]);
                double longitude = Double.parseDouble(location[1]);

                String siDo = null;
                String siGunGo = null;
                String eupMyeonDong = null;

                // 시도, 시군구, 동 정보 설정
                for (SpotLists spotList : spotLists) {
                    if (spotList.getLa() == latitude && spotList.getLo() == longitude) {
                        siDo = spotList.getSiDo();
                        siGunGo = spotList.getSiGunGo();
                        eupMyeonDong = spotList.getEupMyeonDong();
                        break;
                    }
                }
                if (siDo == null || siGunGo == null || eupMyeonDong == null) {
                    throw new CustomException(ErrorType.NOT_FOUND_DONG);
                }

                String address = siDo + " " + siGunGo + " " + eupMyeonDong;

                // 이미 해당 좌표 주변에 Footsteps가 있는지 확인
                boolean nearbyFootstepsExist = footstepsRepository.existsByLatitudeBetweenAndLongitudeBetween(latitude - 0.002, latitude + 0.002, longitude - 0.002, longitude + 0.002);

                if (!nearbyFootstepsExist) {
                    for (Map.Entry<Long, Integer> userCountEntry : entry.getValue().entrySet()) {
                        Long userId = userCountEntry.getKey();
                        int visitedNum = userCountEntry.getValue();
                        // 해당 좌표의 이미지 URL 가져오기
                        String userImgUrl = locationUserImageMap.get(entry.getKey()).get(userId);
                        Footsteps footsteps = Footsteps.of(latitude, longitude, visitedNum, userId, address, userImgUrl);
                        footstepsRepository.save(footsteps);
                    }
                }
            }
        }
    }
}
