package org.ssafy.ssafy_sec_proj.trail.service;

import com.fasterxml.jackson.core.JsonParser;
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
import org.ssafy.ssafy_sec_proj.trail.entity.TrailsAroundFacility;
import org.ssafy.ssafy_sec_proj.trail.repository.CustomTrailsRepository;
import org.ssafy.ssafy_sec_proj.trail.repository.SpotListsRepository;
import org.ssafy.ssafy_sec_proj.trail.repository.TrailsAroundFacilityRepository;
import org.ssafy.ssafy_sec_proj.users.entity.RecUsers;
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

        CustomTrails customTrails = customTrailsRepository.findByIdAndUserIdAndDeletedAtIsNull(trailsId, user)
                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_TRAIL));

        CoordinateListResponseDto coordinateListResponseDto = customTrailService.readCorrdinateList(user, trailsId);
        Optional<List<SpotLists>> optionalSpotLists = spotListsRepository.findAllByCustomTrailsIdAndDeletedAtIsNull(customTrails);

        // optional 에서는 없는 경우 에러처리 해줘야 한다.
        if (optionalSpotLists.isEmpty()) {
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

        double centerLatitude = (easternMostSpot.getLa() + westernMostSpot.getLa() + southernMostSpot.getLa() + northernMostSpot.getLa()) / 4.0;
        double centerLongitude = (southernMostSpot.getLo() + northernMostSpot.getLo() + easternMostSpot.getLo() + westernMostSpot.getLo()) / 4.0;

        Map<String, List<Map<String, Double>>> requestBody = new HashMap<>();
        requestBody.put("data", requestBodyCoordinates.stream()
                .map(coordinate -> Map.of("latitude", coordinate.getLongitude(), "longitude", coordinate.getLatitude()))
                .collect(Collectors.toList()));

        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, List<Map<String, Double>>>> requestEntity = new HttpEntity<>(requestBody, headers);
        System.out.println("requestBodyCoordinates: " + requestBodyCoordinates);

        RestTemplate restTemplate = new RestTemplate();
        String url = "http://j10d207a.p.ssafy.io:8000/data";
        ResponseEntity<Map<String, List<Object>>> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                requestEntity,
                new ParameterizedTypeReference<Map<String, List<Object>>>() {
                });

        Map<String, List<Object>> responseMap = response.getBody();
        System.out.println(responseMap);
        List<AroundFacilityResponseDto> dtoList = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);


//        int cctvNum = 0;
//        int convenienceNum = 0;
//        int cafeNum = 0;
//        int restaurantNum = 0;
//        int policeNum = 0;

        List<AroundFacilityResponseDto> DtoList = null;
        if (responseMap != null) {
            DtoList = new ArrayList<>();
            for (Map.Entry<String, List<Object>> entry : responseMap.entrySet()) {
                List<Object> facilitiesListObj = entry.getValue();
                for (Object obj : facilitiesListObj) {
                    System.out.println(obj);
                    JsonNode jsonNode = objectMapper.readTree(obj.toString());
                    String address = jsonNode.has("address") ? jsonNode.get("address").asText() : null;
                    String place = jsonNode.has("place") ? jsonNode.get("place").asText() : null;
                    String distribution = jsonNode.has("distribution") ? jsonNode.get("distribution").asText() : null;
                    double lat = jsonNode.has("lat") ? jsonNode.get("lat").asDouble() : 0.00;
                    double log = jsonNode.has("log") ? jsonNode.get("log").asDouble() : 0.00;
                    String phone = jsonNode.has("phone") ? jsonNode.get("phone").asText() : null;
                    String source = jsonNode.has("source") ? jsonNode.get("source").asText() : null;

                    DtoList.add(AroundFacilityResponseDto.of(address, place, lat, log, source, phone, distribution));

//                    switch (source) {
//                        case "cctv":
//                            cctvNum++;
//                            break;
//                        case "convenience":
//                            convenienceNum++;
//                            break;
//                        case "cafe":
//                            cafeNum++;
//                            break;
//                        case "restaurant":
//                            restaurantNum++;
//                            break;
//                        case "police":
//                            policeNum++;
//                            break;
//                    }
                }
            }
        }

//        TrailsAroundFacility trailsAroundFacility = TrailsAroundFacility.of(
//                cctvNum,
//                convenienceNum,
//                cafeNum,
//                restaurantNum,
//                policeNum,
//                customTrails
//        );
//        trailsAroundFacilityRepository.save(trailsAroundFacility);

//        Optional<RecUsers> optionalRecUsers = recUsersRepository.findByUserId(user.getId());
//        // 추후 추가 추천 유저 기존 Num 가져와서 이번에 얻은 Num 추가해서 저장할 것
//        RecUsers recUsers = RecUsers.of(
//                cctvNum,
//                convenienceNum,
//                cafeNum,
//                restaurantNum,
//                policeNum
//        );
//        recUsersRepository.save(recUsers);

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
                DtoList,
                centerLatitude,
                centerLongitude
        );
        return responseDto;
    }
}