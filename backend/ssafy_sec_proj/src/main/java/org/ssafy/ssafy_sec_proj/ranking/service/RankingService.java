package org.ssafy.ssafy_sec_proj.ranking.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.ssafy_sec_proj.ranking.dto.responseDto.FootstepListResponseDto;
import org.ssafy.ssafy_sec_proj.ranking.entity.Footsteps;
import org.ssafy.ssafy_sec_proj.ranking.repository.FootstepsRepository;
import org.ssafy.ssafy_sec_proj.trail.entity.SpotLists;
import org.ssafy.ssafy_sec_proj.trail.repository.SpotListsRepository;
import org.ssafy.ssafy_sec_proj.users.entity.User;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class RankingService {

    private final SpotListsRepository spotListsRepository;
    private final FootstepsRepository footstepsRepository;

    public List<FootstepListResponseDto> myFootstep(User user) {

        List<Footsteps> myFootsteps = footstepsRepository.findAllByUserId(user.getId());

        List<FootstepListResponseDto> ansDtos = new ArrayList<>();
        for (Footsteps f : myFootsteps) {
            ansDtos.add(FootstepListResponseDto.of(user.getId(), user.getUserName(), f.getVisitedNum(), f.getLatitude(), f.getLongitude()));
        }
        return ansDtos;
    }

    public void makeFootstep() {
        footstepsRepository.deleteAllInBatch();
        LocalTime fiveMinutesAgo = LocalTime.of( 0, 0, 5);
        List<SpotLists> spotLists = spotListsRepository.findByDurationGreaterThanEqual(fiveMinutesAgo);
        // la와 lo가 같은 위치에 대해 유저별로 몇 번 지나갔는지 카운트
        Map<String, Map<Long, Integer>> locationCountMap = new HashMap<>();
        for (SpotLists spotList : spotLists) {
            String locationKey = spotList.getLa() + "," + spotList.getLo();
            System.out.println("좌표값 : "+locationKey);
            long userId = spotList.getCustomTrailsId().getUserId().getId();
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
                for (Map.Entry<Long, Integer> userCountEntry : entry.getValue().entrySet()) {
                    Long userId = userCountEntry.getKey();
                    int visitedNum = userCountEntry.getValue();
                    Footsteps footsteps = Footsteps.of(latitude, longitude, visitedNum, userId);
                    footstepsRepository.save(footsteps);
                }
            }
        }
    }
}
