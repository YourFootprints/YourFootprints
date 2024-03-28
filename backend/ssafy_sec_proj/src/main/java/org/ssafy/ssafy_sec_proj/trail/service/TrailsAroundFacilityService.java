package org.ssafy.ssafy_sec_proj.trail.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.ssafy.ssafy_sec_proj._common.exception.CustomException;
import org.ssafy.ssafy_sec_proj._common.exception.ErrorType;
import org.ssafy.ssafy_sec_proj.trail.dto.request.CoordinateRequestDto;
import org.ssafy.ssafy_sec_proj.trail.dto.response.CoordinateListResponseDto;
import org.ssafy.ssafy_sec_proj.trail.dto.response.TrailsAroundFacilityResponseDto;
import org.ssafy.ssafy_sec_proj.trail.entity.CustomTrails;
import org.ssafy.ssafy_sec_proj.trail.entity.SpotLists;
import org.ssafy.ssafy_sec_proj.trail.entity.TrailsAroundFacility;
import org.ssafy.ssafy_sec_proj.trail.repository.CustomTrailsRepository;
import org.ssafy.ssafy_sec_proj.trail.repository.SpotListsRepository;
import org.ssafy.ssafy_sec_proj.trail.repository.TrailsAroundFacilityRepository;
import org.ssafy.ssafy_sec_proj.users.entity.TrailsMidLikes;
import org.ssafy.ssafy_sec_proj.users.entity.User;
import org.ssafy.ssafy_sec_proj.users.repository.TrailsMidLikesRepository;
import org.ssafy.ssafy_sec_proj.users.repository.UserRepository;
import org.springframework.http.HttpMethod;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@ToString
public class TrailsAroundFacilityService {
    private final CustomTrailsRepository customTrailsRepository;
    private final UserRepository userRepository;
    private final RestTemplate restTemplate;
    private final SpotListsRepository spotListsRepository;
    private final TrailsMidLikesRepository trailsMidLikesRepository;
    private final CustomTrailService customTrailService;
    private final TrailsAroundFacilityRepository trailsAroundFacilityRepository;

    public TrailsAroundFacilityResponseDto readAroundFacility(User user, Long trailsId){

        if (userRepository.findByKakaoEmailAndDeletedAtIsNull(user.getKakaoEmail()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }

        CustomTrails customTrails = customTrailsRepository.findByIdAndUserIdAndDeletedAtIsNull(trailsId, user)
                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_TRAIL));

        CoordinateListResponseDto coordinateListResponseDto = customTrailService.readCorrdinateList(user, trailsId);
        Optional<List<SpotLists>> optionalSpotLists = spotListsRepository.findAllByCustomTrailsIdAndDeletedAtIsNull(customTrails);

        // optional 에서는 없는 경우 에러처리 해줘야 한다.
        if(optionalSpotLists.isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_SPOT_LIST);
        }

        List<SpotLists> spotLists = optionalSpotLists.get();

        // 각 방향별 좌표 추출
        SpotLists easternMostSpot = spotLists.stream().max(Comparator.comparing(SpotLists::getLo)).get(); // 제일 동쪽
        SpotLists westernMostSpot = spotLists.stream().min(Comparator.comparing(SpotLists::getLo)).get(); // 제일 서쪽
        SpotLists southernMostSpot = spotLists.stream().min(Comparator.comparing(SpotLists::getLa)).get(); // 제일 남쪽
        SpotLists northernMostSpot = spotLists.stream().max(Comparator.comparing(SpotLists::getLa)).get(); // 제일 북쪽

        // request dto에 동서남북 좌표 추가하기(of 메서드 이용)
        List<CoordinateRequestDto> requestBodyCoordinates = new ArrayList<>();
        requestBodyCoordinates.add(CoordinateRequestDto.of(easternMostSpot.getLa(), easternMostSpot.getLo()));
        requestBodyCoordinates.add(CoordinateRequestDto.of(westernMostSpot.getLa(), westernMostSpot.getLo()));
        requestBodyCoordinates.add(CoordinateRequestDto.of(southernMostSpot.getLa(), southernMostSpot.getLo()));
        requestBodyCoordinates.add(CoordinateRequestDto.of(northernMostSpot.getLa(), northernMostSpot.getLo()));

        Map<String, List<Map<String, Double>>> requestBody = new HashMap<>();
        requestBody.put("data", requestBodyCoordinates.stream()
                .map(coordinate -> Map.of("latitude", coordinate.getLatitude(), "longitude", coordinate.getLongitude()))
                .collect(Collectors.toList()));

        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, List<Map<String, Double>>>> requestEntity = new HttpEntity<>(requestBody, headers);
        System.out.println("requestBodyCoordinates: " + requestBodyCoordinates);

        RestTemplate restTemplate = new RestTemplate();
        String url = "http://j10d207a.p.ssafy.io:8000/data";
        ResponseEntity<Map<String, List>> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                requestEntity,
                new ParameterizedTypeReference<Map<String, List>>() {
                });

        Map<String, List> responseMap = response.getBody();
        System.out.println(responseMap);

        ObjectMapper objectMapper = new ObjectMapper();
        int cctvNum = responseMap.get("cctv").size(); // CCTV 개수
        int convenienceNum = responseMap.get("convenience").size(); // 편의점 개수
        int cafeNum = responseMap.get("cafe").size(); // 카페 개수
        int restaurantNum = responseMap.get("restaurant").size(); // 음식점 개수
        int policeNum = responseMap.get("police").size();

        TrailsAroundFacility trailsAroundFacility = TrailsAroundFacility.of(
                cctvNum,
                convenienceNum,
                cafeNum,
                restaurantNum,
                policeNum,
                customTrails
        );
        trailsAroundFacilityRepository.save(trailsAroundFacility);


        // 좋아요 확인하는 코드
        TrailsMidLikes trailsMidLikes = trailsMidLikesRepository.findByUserIdAndTrailsIdAndDeletedAtIsNull(user, customTrails);
        boolean isLike = trailsMidLikes != null;
        TrailsAroundFacilityResponseDto responseDto = TrailsAroundFacilityResponseDto.of(
                user.getNickName(),
                customTrails.getRuntime(),
                customTrails.getDistance(),
                customTrails.getSiDo(),
                customTrails.getSiGunGo(),
                customTrails.getEupMyeonDong(),
                customTrails.isPublic(),
                customTrails.getStarRanking(),
                customTrails.getMemo(),
                isLike,
                customTrails.getLikeNum(),
                coordinateListResponseDto.getCoordinateList(),
                responseMap

        );

        return responseDto;
    }


}
