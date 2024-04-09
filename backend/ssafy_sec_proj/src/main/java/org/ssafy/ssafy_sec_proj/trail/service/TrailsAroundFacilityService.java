package org.ssafy.ssafy_sec_proj.trail.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
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
import org.ssafy.ssafy_sec_proj.trail.dto.response.AroundFacilityResponseDto;
import org.ssafy.ssafy_sec_proj.trail.dto.response.CoordinateListResponseDto;
import org.ssafy.ssafy_sec_proj.trail.dto.response.TrailsAroundFacilityResponseDto;
import org.ssafy.ssafy_sec_proj.trail.entity.CustomTrails;
import org.ssafy.ssafy_sec_proj.trail.entity.SpotLists;
import org.ssafy.ssafy_sec_proj.trail.repository.CustomTrailsRepository;
import org.ssafy.ssafy_sec_proj.trail.repository.SpotListsRepository;
import org.ssafy.ssafy_sec_proj.trail.repository.TrailsAroundFacilityRepository;
import org.ssafy.ssafy_sec_proj.users.entity.TrailsMidLikes;
import org.ssafy.ssafy_sec_proj.users.entity.User;
import org.ssafy.ssafy_sec_proj.users.repository.RecUsersRepository;
import org.ssafy.ssafy_sec_proj.users.repository.TrailsMidLikesRepository;
import org.ssafy.ssafy_sec_proj.users.repository.UserRepository;
import org.springframework.http.HttpMethod;

import java.io.IOException;
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
    private final RecUsersRepository recUsersRepository;

    public TrailsAroundFacilityResponseDto readAroundFacility(User user, Long trailsId) throws IOException {

        if (userRepository.findByKakaoEmailAndDeletedAtIsNull(user.getKakaoEmail()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }

        CustomTrails customTrails = customTrailsRepository.findByIdAndDeletedAtIsNull(trailsId)
                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_TRAIL));

        CoordinateListResponseDto coordinateListResponseDto = customTrailService.readCorrdinateList(user, trailsId);
        Optional<List<SpotLists>> optionalSpotLists = spotListsRepository.findAllByCustomTrailsIdAndDeletedAtIsNull(customTrails);

        // optional 에서는 없는 경우 에러처리 해줘야 한다.
        if (optionalSpotLists.isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_SPOT_LIST);
        }

        List<SpotLists> spotLists = optionalSpotLists.get();

        // 중심좌표 찾는 알고리즘
        double sumLatitude = 0.0;
        double sumLongitude = 0.0;

        for (SpotLists spot : spotLists) {
            sumLatitude += spot.getLa();
            sumLongitude += spot.getLo();
        }

        double centralCoordinatesLa = sumLatitude / spotLists.size();
        double centralCoordinatesLo = sumLongitude / spotLists.size();


        /* 프론트 리팩토링을 위해 fastApi 부분 주석처리
        String url = String.format("http://j10d207a.p.ssafy.io:8000/data/%f /%f", centralCoordinatesLa, centralCoordinatesLo);

        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        System.out.println("Response Body from FastAPI: " + response.getBody());

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        String responseBody = response.getBody();
        Map<String, List<AroundFacilityResponseDto>> responseDtoMap = new HashMap<>();
        try {
            Map<String, List<Object>> responseMap = objectMapper.readValue(responseBody, new TypeReference<Map<String, List<Object>>>() {});
            if (responseMap != null) {
                for (Map.Entry<String, List<Object>> entry : responseMap.entrySet()) {
                    String entryKey = entry.getKey();
                    List<Object> facilitiesListObj = entry.getValue();
                    List<AroundFacilityResponseDto> dtoList = new ArrayList<>();
                    for (Object obj : facilitiesListObj) {
                        System.out.println("obj : " + obj);
                        JsonNode jsonNode = objectMapper.readTree(obj.toString());
                        String address = jsonNode.has("address") ? jsonNode.get("address").asText() : null;
                        String place = jsonNode.has("place") ? jsonNode.get("place").asText() : null;
                        String distribution = jsonNode.has("distribution") ? jsonNode.get("distribution").asText() : null;
                        double lat = jsonNode.has("lat") ? jsonNode.get("lat").asDouble() : 0.00;
                        double log = jsonNode.has("log") ? jsonNode.get("log").asDouble() : 0.00;
                        String phone = jsonNode.has("phone") ? jsonNode.get("phone").asText() : null;
                        String source = jsonNode.has("source") ? jsonNode.get("source").asText() : null;

                        dtoList.add(AroundFacilityResponseDto.of(address, place, lat, log, source, phone, distribution));
                    }
                    responseDtoMap.put(entryKey, dtoList);
                }
            }
        } catch (JsonProcessingException e) {
            throw new CustomException(ErrorType.JSON_PASSING_ERROR);
        } catch (Exception e) {
            throw new CustomException(ErrorType.FASTAPI_ERROR);
        }*/

        Map<String, List<AroundFacilityResponseDto>> responseDtoMap = new HashMap<>();
        List<AroundFacilityResponseDto> toiletList = new ArrayList<>();
        String entryKey = "toilet";
        toiletList.add(AroundFacilityResponseDto.of("경북 칠곡군 석적읍 중지리 527", "칠곡호국평화기념관 공중화장실", centralCoordinatesLa - 0.0011, centralCoordinatesLo + 0.0005, "toilet", "054 9753520", "한식"));
        toiletList.add(AroundFacilityResponseDto.of("경북 칠곡군 석적읍 중지리 335", "칠곡보 야외화장실", centralCoordinatesLa - 0.0003, centralCoordinatesLo - 0.0008, "toilet", "054 9753520", "한식"));
        responseDtoMap.put(entryKey, toiletList);

        List<AroundFacilityResponseDto> policeList = new ArrayList<>();
        policeList.add(AroundFacilityResponseDto.of("경북 칠곡군 석적읍 중지리 527", "칠곡호국평화기념관 공중화장실", centralCoordinatesLa - 0.0004, centralCoordinatesLo - 0.0007, "toilet", "054 9753520", "한식"));
        policeList.add(AroundFacilityResponseDto.of("경북 칠곡군 석적읍 중지리 335", "칠곡보 야외화장실", centralCoordinatesLa + 0.0013, centralCoordinatesLo + 0.0013, "toilet", "054 9753520", "한식"));
        responseDtoMap.put("police", policeList);

        List<AroundFacilityResponseDto> restaurantList = new ArrayList<>();
        restaurantList.add(AroundFacilityResponseDto.of("경북 칠곡군 석적읍 중지리 527", "칠곡호국평화기념관 공중화장실", centralCoordinatesLa - 0.0001, centralCoordinatesLo - 0.0001, "toilet", "054 9753520", "한식"));
        restaurantList.add(AroundFacilityResponseDto.of("경북 칠곡군 석적읍 중지리 335", "칠곡보 야외화장실", centralCoordinatesLa - 0.0003, centralCoordinatesLo - 0.0003, "toilet", "054 9753520", "한식"));
        responseDtoMap.put("restaurant", restaurantList);

        List<AroundFacilityResponseDto> cctvList = new ArrayList<>();
        cctvList.add(AroundFacilityResponseDto.of(null, "경상북도 칠곡군청", centralCoordinatesLa - 0.0008, centralCoordinatesLo + 0.0002, "toilet", "054 9753520", "한식"));
        cctvList.add(AroundFacilityResponseDto.of(null, "경상북도 칠곡군청", centralCoordinatesLa + 0.0005, centralCoordinatesLo - 0.0006, "toilet", "054 9753520", "한식"));
        responseDtoMap.put("cctv", cctvList);

        List<AroundFacilityResponseDto> cafeList = new ArrayList<>();
        cafeList.add(AroundFacilityResponseDto.of("경북 칠곡군 석적읍 반계리 49", "무인다방 세아수목원점", centralCoordinatesLa - 0.0007, centralCoordinatesLo - 0.0000, "cafe", "054 9753520", "한식"));
        cafeList.add(AroundFacilityResponseDto.of("경북 칠곡군 왜관읍 아곡리 138", "파스쿠찌 칠곡휴게소서울방향점", centralCoordinatesLa - 0.0011, centralCoordinatesLo + 0.0009, "cafe", "054 9753520", "한식"));
        responseDtoMap.put("cafe", cafeList);

        List<AroundFacilityResponseDto> convenienceList = new ArrayList<>();
        convenienceList.add(AroundFacilityResponseDto.of("경북 칠곡군 석적읍 중지리 559", "GS25 칠곡보점", centralCoordinatesLa - 0.0005, centralCoordinatesLo + 0.0008, "convenience", "054 9753520", "한식"));
        convenienceList.add(AroundFacilityResponseDto.of("경북 칠곡군 석적읍 반계리 22-3", "CU 대구큐브에스점", centralCoordinatesLa - 0.0003, centralCoordinatesLo + 0.0009, "conveniencet", "054 9753520", "한식"));
        responseDtoMap.put("convenience", convenienceList);



        String memo = customTrails.getMemo() != null && !customTrails.getMemo().isEmpty() ? customTrails.getMemo() : "메모를 작성해주세요.";
        String trailsName = customTrails.getTrailsName().equals(user.getNickName()) ?  user.getNickName() : customTrails.getTrailsName();
        // 좋아요 확인하는 코드.
        TrailsMidLikes trailsMidLikes = trailsMidLikesRepository.findByUserIdAndTrailsIdAndDeletedAtIsNull(user, customTrails);
        boolean isLike = trailsMidLikes != null;
        TrailsAroundFacilityResponseDto responseDto = TrailsAroundFacilityResponseDto.of(
                trailsName,
                customTrails.getRuntime(),
                customTrails.getDistance(),
                customTrails.getSiDo(),
                customTrails.getSiGunGo(),
                customTrails.getEupMyeonDong(),
                customTrails.isPublic(),
                customTrails.getStarRanking(),
                memo,
                isLike,
                customTrails.getLikeNum(),
                coordinateListResponseDto.getCoordinateList(),
                responseDtoMap,
                // 위도, 경도
                centralCoordinatesLa,
                centralCoordinatesLo
        );
        return responseDto;
    }
}