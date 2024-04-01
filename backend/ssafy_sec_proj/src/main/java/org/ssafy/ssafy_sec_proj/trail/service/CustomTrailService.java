package org.ssafy.ssafy_sec_proj.trail.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.ssafy.ssafy_sec_proj._common.entity.DongGeo;
import org.ssafy.ssafy_sec_proj._common.entity.SiDoGeo;
import org.ssafy.ssafy_sec_proj._common.entity.SiGunGuGeo;
import org.ssafy.ssafy_sec_proj._common.exception.CustomException;
import org.ssafy.ssafy_sec_proj._common.exception.ErrorType;
import org.ssafy.ssafy_sec_proj._common.repository.DongGeoRepository;
import org.ssafy.ssafy_sec_proj._common.repository.SiDoGeoRepository;
import org.ssafy.ssafy_sec_proj._common.repository.SiGunGuGeoRepository;
import org.ssafy.ssafy_sec_proj._common.service.S3Uploader;
import org.ssafy.ssafy_sec_proj.trail.dto.response.*;
import org.ssafy.ssafy_sec_proj.trail.dto.request.*;
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

import java.time.LocalTime;
import java.util.*;
import java.io.IOException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomTrailService {
    private final CustomTrailsRepository customTrailsRepository;
    private final UserRepository userRepository;
    private final TrailsMidLikesRepository trailsMidLikesRepository;
    private final SpotListsRepository spotListsRepository;
    private final S3Uploader s3Uploader;
    private final SiDoGeoRepository siDoGeoRepository;
    private final SiGunGuGeoRepository siGunGuGeoRepository;
    private final DongGeoRepository dongGeoRepository;
    private final TrailsAroundFacilityRepository trailsAroundFacilityRepository;
    private final RecUsersRepository recUsersRepository;

    // 산책 기록 상세
    @Transactional
    public CustomTrailDetailResponseDto readCustomTrailDetail(User user, Long trailsId) {
        CustomTrails customTrails = customTrailsRepository.findByIdAndUserIdAndDeletedAtIsNull(trailsId, user).orElseThrow(
                () -> new CustomException(ErrorType.NOT_FOUND_TRAIL)
        );


        CustomTrailDetailResponseDto responseDto = CustomTrailDetailResponseDto.of(customTrails.getTrailsName(), customTrails.getCreatedAt(),
                customTrails.isPublic(), customTrails.getTrailsImg(), customTrails.getRuntime(), customTrails.getDistance(),
                customTrails.getSiDo() + " "  + customTrails.getSiGunGo() + " " + customTrails.getEupMyeonDong(),
                customTrails.getStarRanking(), customTrails.getMemo());
        return responseDto;
    }

    // 캘린더 기록
    @Transactional
    public RecordListResponseDto readCalenderRecords(User user, int year, int month){
        List<CustomTrails> calenderList = customTrailsRepository.findCustomTrails(year, month, user).orElse(null);
        RecordListResponseDto responseDto = RecordListResponseDto.from(
                calenderList
                        .stream()
                        .map(c -> CalenderRecordResponseDto.of(
                                c.getId(),
                                c.getCreatedAt(),
                                c.getTrailsName(),
                                c.getRuntime(),
                                c.getDistance()
                        ))
                        .toList());
        return responseDto;

    }

    // 산책 기록
    @Transactional
    public RecordListResponseDto readRecords(User user){
        List<CustomTrails> recordList = customTrailsRepository.findAllByUserIdAndDeletedAtIsNull(user).orElse(null);
        RecordListResponseDto responseDto = RecordListResponseDto.from(
                recordList
                        .stream()
                        .map(r -> RecordResponseDto.of(
                                r.getId(),
                                r.getTrailsImg(),
                                transferRuntime(r.getRuntime()),
                                r.getDistance(),
                                r.getLikeNum(),
                                r.getSiGunGo() + " " + r.getEupMyeonDong(),
                                checkIsLike(r.getUserId(), r)
                        ))
                        .toList());
        return responseDto;
    }

    // 정적 이미지 클릭
    @Transactional
    public CoordinateListResponseDto readCorrdinateList(User user, Long trailsId){
        CustomTrails customTrails = customTrailsRepository.findByIdAndDeletedAtIsNull(trailsId).orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_TRAIL));
        if (!customTrails.getUserId().getId().equals(user.getId())) {
            throw new CustomException(ErrorType.NOT_MATCHING_USER);
        }
        List<SpotLists> coordList = spotListsRepository.findAllByCustomTrailsIdAndDeletedAtIsNull(customTrails)
                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_SPOT_LIST));
        CoordinateListResponseDto responseDto = CoordinateListResponseDto.from(
                coordList
                        .stream()
                        .map(c -> CoordResponseDto.of(
                                c.getLa(),
                                c.getLo()
                        ))
                        .toList());
        return responseDto;
    }

    // runtime 분 단위로 변환하는 메서드
    public int transferRuntime(String runtime) {
        String[] times = runtime.split(":");
        return Integer.parseInt(times[0]) * 60 + Integer.parseInt(times[1]);
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

    // 커스텀 산책로 만들기
    @Transactional
    public CustomTrailsCreateResponseDto createCustomTrail(CustomTrailsCreateRequestDto dto, User user) {
        if (userRepository.findByKakaoEmailAndDeletedAtIsNull(user.getKakaoEmail()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }

        String sidoNm =  " ";
        SiDoGeo siDoGeo = siDoGeoRepository.findSiDoByCoordinate(dto.getLa(), dto.getMa());
        if (siDoGeo != null) {
            sidoNm = siDoGeo.getSidoNm();
        }
        SiGunGuGeo siGunGuGeo = siGunGuGeoRepository.findSiGunGuByCoordinate(dto.getLa(), dto.getMa());
        String siGunGuNM = " ";
        if (siGunGuGeo != null) {
            siGunGuNM = siGunGuGeo.getSigunguNm();
        }
        String dongNM = " ";
        DongGeo dongGeo = dongGeoRepository.findDongByCoordinate(dto.getLa(), dto.getMa());
        if (siGunGuGeo != null) {
            dongNM = dongGeo.getEmdKorNm();
        }
        CustomTrails customTrails = CustomTrails.of(
                user.getNickName(),
                null,
                0,
                dto.getRuntime(),
                dto.getDistance(),
                dto.getCalorie(),
                null,
                false,
                0,
                sidoNm,
                siGunGuNM,
                dongNM,
                user);
        CustomTrails savedCustomTrails = customTrailsRepository.save(customTrails);
        return CustomTrailsCreateResponseDto.of(savedCustomTrails.getId());
    }

    // 산책 종료 후 공개 편집
    @Transactional
    public CustomTrailsPublicResponseDto editPublic(User user, Long trailsId, CustomTrailsPublicRequestDto dto){
        CustomTrails customTrails = customTrailsRepository.findByIdAndUserIdAndDeletedAtIsNull(trailsId, user)
                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_TRAIL));
        // 동일한 값인지 체크
        if (dto.isPublic() != customTrails.isPublic()) {
            throw new CustomException(ErrorType.ALREADY_EXIST_CUSTOM_TRAILS_PUBLIC);
        }
        customTrails.updatePublic(!dto.isPublic());
        customTrailsRepository.save(customTrails);
        CustomTrailsPublicResponseDto responseDto = CustomTrailsPublicResponseDto.of(!dto.isPublic());
        return responseDto;
    }

    // 산책 기록 상세 편집
    @Transactional
    public CustomTrailsEditResponseDto editCustomTrailRecord(User user, Long trailsId, CustomTrailsEditRequestDto dto) {
        CustomTrails customTrails = customTrailsRepository.findByIdAndUserIdAndDeletedAtIsNull(trailsId, user)
                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_TRAIL));

        // imgURL을 만들어서 S3에 저장 시작
        String imgUrl = "";
        System.out.println(dto.getTrailsImg());
        if (dto.getTrailsImg() == null) {
            imgUrl = customTrails.getTrailsImg();
        } else {
            try {
                imgUrl = s3Uploader.upload(dto.getTrailsImg());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        // imgURL을 만들어서 S3에 저장 끝

        customTrails.updateRecord(dto.getMemo(), dto.getStarRanking(), imgUrl, dto.getTrailsName());
        customTrailsRepository.save(customTrails);
        CustomTrailsEditResponseDto responseDto = CustomTrailsEditResponseDto.of(dto.getTrailsName(), customTrails.getCreatedAt(),
                customTrails.isPublic(), imgUrl, customTrails.getRuntime(), customTrails.getDistance(),
                customTrails.getSiDo() + " "  + customTrails.getSiGunGo() + " " + customTrails.getEupMyeonDong(),
                dto.getStarRanking(), dto.getMemo());
        return responseDto;
    }

    // 산책로 목록
    @Transactional
    public CustomTrailsListResponseDto readTrailsList(List<String> runtime, String address){
        List<CustomTrails> trailsList = new ArrayList<>();

        if (runtime.isEmpty() && address.isEmpty()){
            trailsList = customTrailsRepository.findAllByIsPublicIsTrueAndDeletedAtIsNullOrderByLikeNumDesc().orElse(null);
        } else if (runtime.isEmpty() && !address.isEmpty()) {
            String[] addressList= address.split(" ");
            if (addressList.length == 3) {
                trailsList = customTrailsRepository.findAllCustomTrailsBySiDoAndSiGunGoAndEupMyeonDong(addressList[0], addressList[1], addressList[2]).orElse(null);
            }
        } else if (!runtime.isEmpty()){
            // 유효한 값인지 체크
            if (runtime.size() != 2 || runtime.get(0).isEmpty() || runtime.get(1).isEmpty()) {
                throw new CustomException(ErrorType.NOT_CORRECT_RUNTIME);
            }
            if (address.isEmpty()){
                trailsList = customTrailsRepository.findAllCustomTrailsByRuntime(transferRuntime(runtime.get(0)), transferRuntime(runtime.get(1))).orElse(null);
            } else {
                String[] addressList= address.split(" ");
                if (addressList.length == 3){
                    trailsList = customTrailsRepository.findAllCustomTrailsBySiDoAndSiGunGoAndEupMyeonDongAndRuntime(addressList[0], addressList[1], addressList[2],
                            transferRuntime(runtime.get(0)), transferRuntime(runtime.get(1))).orElse(null);
                }

            }
        }

        CustomTrailsListResponseDto responseDto = CustomTrailsListResponseDto.from(
                trailsList
                        .stream()
                        .map(t -> RecordResponseDto.of(
                                t.getId(),
                                t.getTrailsImg(),
                                transferRuntime(t.getRuntime()),
                                t.getDistance(),
                                t.getLikeNum(),
                                t.getSiGunGo() + " " + t.getEupMyeonDong(),
                                checkIsLike(t.getUserId(), t)
                        ))
                        .toList());
        return responseDto;
    }
    @Transactional
    public void receiveData(User user, Long trailsId, CustomTrailsReceiveDataRequestDto dto){
        CustomTrails customTrails = customTrailsRepository.findByIdAndUserIdAndDeletedAtIsNull(trailsId, user)
                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_TRAIL));

        List<SpotLists> existingSpots = spotListsRepository.findByCustomTrailsIdAndDeletedAtIsNull(customTrails)
                .orElse(Collections.emptyList());

        Set<String> existingCoordinates = existingSpots.stream()
                .map(spot -> String.format("%.4f", spot.getLa()) + ":" + String.format("%.4f", spot.getLo()))
                .collect(Collectors.toSet());

        List<SpotLists> newSpots = new ArrayList<>();
        for (CustomTrailsReceiveDataRequestDto.SpotDto spotDto : dto.getSpotLists()) {

            System.out.println("spotDto.getLa() : " +spotDto.getLa());
            System.out.println("spotDto.getMa() : " +spotDto.getMa());
            // 위도, 경도 소수 4번째 자리까지 반올림
            double roundedLa = Math.round(spotDto.getLa() * 10000) / 10000.0;
            double roundedLo = Math.round(spotDto.getMa() * 10000) / 10000.0;
            System.out.println(roundedLa + " " + roundedLo);
            String currentCoordinates = spotDto.getLa() + ":" + spotDto.getMa();
            String sidoNm =  " ";
            SiDoGeo sidogeo = siDoGeoRepository.findSiDoByCoordinate(spotDto.getLa(), spotDto.getMa());
            if (sidogeo != null) {
                sidoNm = sidogeo.getSidoNm();
            }

            String siGunGuNM = " ";
            SiGunGuGeo siGunGuGeo = siGunGuGeoRepository.findSiGunGuByCoordinate(spotDto.getLa(), spotDto.getMa());
            if (siGunGuGeo != null) {
                siGunGuNM = siGunGuGeo.getSigunguNm();
            }

            String dongNM = " ";
            DongGeo dongGeo = dongGeoRepository.findDongByCoordinate(spotDto.getLa(), spotDto.getMa());
            if (siGunGuGeo != null) {
                dongNM = dongGeo.getEmdKorNm();
            }

            if(!existingCoordinates.contains(currentCoordinates)) {
                LocalTime duration = LocalTime.of(00, 00, 00);

                SpotLists newSpot = SpotLists.of(
                        roundedLa,
                        roundedLo,
                        duration,
                        sidoNm,
                        siGunGuNM,
                        dongNM,
                        customTrails
                );
//                spotListsRepository.save(newSpot);
                newSpots.add(newSpot);
            }
        }

        if (newSpots.isEmpty()) {
            throw new CustomException(ErrorType.ALREADY_EXIST_SPOT);
        } else {
            spotListsRepository.saveAll(newSpots);
        }
    }


//    @Async
//    public void end(User user, Long trailsId, CustomTrailsEndRequestDto dto) {
//        CustomTrails customTrails = customTrailsRepository.findByIdAndUserIdAndDeletedAtIsNull(trailsId, user)
//                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_TRAIL));
//
//
//        List<SpotLists> newSpots = new ArrayList<>();
//        // TODO for문 돌지 말고 마지막꺼에서만 이름 찾기
//        CustomTrailsReceiveDataRequestDto.SpotDto lastSpot = dto.getSpotLists().get(dto.getSpotLists().size() - 1);
//        // TODO 좌표 바꾸기
//        System.out.println(lastSpot.getLa() + " " + lastSpot.getMa());
//        // 여기는 시군도 확인용
//        String sidoNm =  " ";
//        SiDoGeo sidogeo = siDoGeoRepository.findSiDoByCoordinate(lastSpot.getMa(), lastSpot.getLa());
//        if (sidogeo != null) {
//            sidoNm = sidogeo.getSidoNm();
//        }
//
//        String siGunGuNM = " ";
//        SiGunGuGeo siGunGuGeo = siGunGuGeoRepository.findSiGunGuByCoordinate(lastSpot.getMa(), lastSpot.getLa());
//        if (siGunGuGeo != null) {
//            siGunGuNM = siGunGuGeo.getSigunguNm();
//        }
//
//        String dongNM = " ";
//        DongGeo dongGeo = dongGeoRepository.findDongByCoordinate(lastSpot.getMa(), lastSpot.getLa());
//        if (siGunGuGeo != null) {
//            dongNM = dongGeo.getEmdKorNm();
//        }
//
//        for (CustomTrailsReceiveDataRequestDto.SpotDto spotDto : dto.getSpotLists()) {
//            // 위도 경도
//            double roundedLo = Math.round(spotDto.getMa() * 10000) / 10000.0;
//            double roundedLa = Math.round(spotDto.getLa() * 10000) / 10000.0;
//
//            // 스팟 리스트 runtime 갱신.
//            String runtime = dto.getRuntime();
//            String[] times = runtime.split(":");
//
//            int hour = Integer.parseInt(times[0]);
//            int minute = Integer.parseInt(times[1]);
//            int second = Integer.parseInt(times[2]);
//            LocalTime duration = LocalTime.of(hour, minute, second);
//
//            SpotLists newSpot = SpotLists.of(
//                    roundedLa,
//                    roundedLo,
//                    duration,
//                    sidoNm,
//                    siGunGuNM,
//                    dongNM,
//                    customTrails
//            );
//            newSpots.add(newSpot);
////                spotListsRepository.save(newSpot);
//        }
////        if (newSpots.isEmpty()) {
////            throw new CustomException(ErrorType.ALREADY_EXIST_SPOT);
////        } else {
//        spotListsRepository.saveAll(newSpots);
////            spotListsRepository.saveAll(existingSpots);
////        }
//
//        // 주변 편의시설 전부 가져와서 recuser에 더하기 해주는 로직
//        // 스팟리스트가 기존에 존재하는 것
////        Optional<List<SpotLists>> optionalSpotLists = spotListsRepository.findAllByCustomTrailsIdAndDeletedAtIsNull(customTrails);
//        // spotListsRepository.findAllByCustomTrailsIdAndDeletedAtIsNull(customTrails)와 newSpots는 같은 값이다.
//
//        // 이거랑 위에거랑 차이
//        List<SpotLists> spotLists = newSpots.stream().toList();
//
//        // 각 방향별 좌표 추출
//        SpotLists easternMostSpot = spotLists.stream().max(Comparator.comparing(SpotLists::getLo)).get(); // 제일 동쪽
//        SpotLists westernMostSpot = spotLists.stream().min(Comparator.comparing(SpotLists::getLo)).get(); // 제일 서쪽
//        SpotLists southernMostSpot = spotLists.stream().min(Comparator.comparing(SpotLists::getLa)).get(); // 제일 남쪽
//        SpotLists northernMostSpot = spotLists.stream().max(Comparator.comparing(SpotLists::getLa)).get(); // 제일 북쪽
//
//        // request dto에 동서남북 좌표 추가하기(of 메서드 이용)
//        List<CoordinateRequestDto> requestBodyCoordinates = new ArrayList<>();
//        requestBodyCoordinates.add(CoordinateRequestDto.of(easternMostSpot.getLa(), easternMostSpot.getLo()));
//        requestBodyCoordinates.add(CoordinateRequestDto.of(westernMostSpot.getLa(), westernMostSpot.getLo()));
//        requestBodyCoordinates.add(CoordinateRequestDto.of(southernMostSpot.getLa(), southernMostSpot.getLo()));
//        requestBodyCoordinates.add(CoordinateRequestDto.of(northernMostSpot.getLa(), northernMostSpot.getLo()));
//
//        Map<String, List<Map<String, Double>>> requestBody = new HashMap<>();
//        requestBody.put("data", requestBodyCoordinates.stream()
//                .map(coordinate -> Map.of("latitude", coordinate.getLa(), "longitude", coordinate.getMa()))
//                .collect(Collectors.toList()));
//
//
//        // HTTP 헤더 설정
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        HttpEntity<Map<String, List<Map<String, Double>>>> requestEntity = new HttpEntity<>(requestBody, headers);
//        System.out.println("requestBodyCoordinates: " + requestBodyCoordinates);
//
//        RestTemplate restTemplate = new RestTemplate();
//        String url = "http://j10d207a.p.ssafy.io:8000/data";
//        ResponseEntity<Map<String, List>> response = restTemplate.exchange(
//                url,
//                HttpMethod.POST,
//                requestEntity,
//                new ParameterizedTypeReference<Map<String, List>>() {
//                });
//
//        Map<String, List> responseMap = response.getBody();
////        System.out.println(responseMap);
//        ObjectMapper objectMapper = new ObjectMapper();
//        int cctvNum = responseMap.get("cctv").size(); // CCTV 개수
//        int convenienceNum = responseMap.get("convenience").size(); // 편의점 개수
//        int cafeNum = responseMap.get("cafe").size(); // 카페 개수
//        int restaurantNum = responseMap.get("restaurant").size(); // 음식점 개수
//        int policeNum = responseMap.get("police").size();
//
//        TrailsAroundFacility trailsAroundFacility = TrailsAroundFacility.of(
//                cctvNum,
//                convenienceNum,
//                cafeNum,
//                restaurantNum,
//                policeNum,
//                customTrails
//        );
//        trailsAroundFacilityRepository.save(trailsAroundFacility);
//
//        // recUser을 불러와서 기존에 있는 값들에 추가해야 한다.
//        Optional<RecUsers> optionalRecUsers = recUsersRepository.findByIdAndDeletedAtIsNull(user.getId());
//        if (optionalRecUsers.isPresent()) {
//            RecUsers recUsers = optionalRecUsers.get();
//            // 기존 엔티티가 존재할 경우 값을 업데이트합니다.
//            recUsers.update(cctvNum, convenienceNum, cafeNum, restaurantNum, policeNum);
//            // 엔티티를 저장합니다.
//            recUsersRepository.save(recUsers);
//        }
//
//
//
//        customTrails = CustomTrails.of(
//                user.getNickName(),
//                null,
//                0,
//                dto.getRuntime(),
//                dto.getDistance(),
//                dto.getCalorie(),
//                null,
//                false,
//                0,
//                customTrails.getSiDo(),
//                customTrails.getSiGunGo(),
//                customTrails.getEupMyeonDong(),
//                user);
//        customTrailsRepository.save(customTrails);
//    }


    @Transactional
    public List<SpotLists> end(User user, Long trailsId, CustomTrailsEndRequestDto dto) {
        CustomTrails customTrails = customTrailsRepository.findByIdAndUserIdAndDeletedAtIsNull(trailsId, user)
                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_TRAIL));

        List<SpotLists> newSpots = new ArrayList<>();
        // TODO for문 돌지 말고 마지막꺼에서만 이름 찾기
        CustomTrailsReceiveDataRequestDto.SpotDto lastSpot = dto.getSpotLists().get(dto.getSpotLists().size() - 1);
        // TODO 좌표 바꾸기
        System.out.println(lastSpot.getLa() + " " + lastSpot.getMa());
        // 여기는 시군도 확인용
        String sidoNm =  " ";
        SiDoGeo sidogeo = siDoGeoRepository.findSiDoByCoordinate(lastSpot.getMa(), lastSpot.getLa());
        if (sidogeo != null) {
            sidoNm = sidogeo.getSidoNm();
        }

        String siGunGuNM = " ";
        SiGunGuGeo siGunGuGeo = siGunGuGeoRepository.findSiGunGuByCoordinate(lastSpot.getMa(), lastSpot.getLa());
        if (siGunGuGeo != null) {
            siGunGuNM = siGunGuGeo.getSigunguNm();
        }

        String dongNM = " ";
        DongGeo dongGeo = dongGeoRepository.findDongByCoordinate(lastSpot.getMa(), lastSpot.getLa());
        if (siGunGuGeo != null) {
            dongNM = dongGeo.getEmdKorNm();
        }

        for (CustomTrailsReceiveDataRequestDto.SpotDto spotDto : dto.getSpotLists()) {
            // 위도 경도
            double roundedLo = Math.round(spotDto.getMa() * 10000) / 10000.0;
            double roundedLa = Math.round(spotDto.getLa() * 10000) / 10000.0;
            System.out.println("spotDto.getMa() = " + spotDto.getMa());
            System.out.println("spotDto.getLa() = " + spotDto.getLa());
            // 스팟 리스트 runtime 갱신.
            String runtime = dto.getRuntime();
            String[] times = runtime.split(":");

            int hour = Integer.parseInt(times[0]);
            int minute = Integer.parseInt(times[1]);
            int second = Integer.parseInt(times[2]);
            LocalTime duration = LocalTime.of(hour, minute, second);

            SpotLists newSpot = SpotLists.of(
                    roundedLa,
                    roundedLo,
                    duration,
                    sidoNm,
                    siGunGuNM,
                    dongNM,
                    customTrails
            );
            newSpots.add(newSpot);
        }

        spotListsRepository.saveAllAndFlush(newSpots);

        return newSpots;
    }

    @Transactional
    @Async
    public void endPy(List<SpotLists> spotLists, User user, Long trailsId, CustomTrailsEndRequestDto dto) {

        CustomTrails customTrails = customTrailsRepository.findByIdAndUserIdAndDeletedAtIsNull(trailsId, user)
                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_TRAIL));
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
                .map(coordinate -> Map.of("latitude", coordinate.getLa(), "longitude", coordinate.getMa()))
                .collect(Collectors.toList()));

        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, List<Map<String, Double>>>> requestEntity = new HttpEntity<>(requestBody, headers);

        RestTemplate restTemplate = new RestTemplate();
        String url = "http://j10d207a.p.ssafy.io:8000/data";
        ResponseEntity<Map<String, List>> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                requestEntity,
                new ParameterizedTypeReference<Map<String, List>>() {
                });

        Map<String, List> responseMap = response.getBody();
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

        Optional<RecUsers> optionalRecUsers = recUsersRepository.findByIdAndDeletedAtIsNull(user.getId());
        if (optionalRecUsers.isPresent()) {
            RecUsers recUsers = optionalRecUsers.get();
            recUsers.update(cctvNum, convenienceNum, cafeNum, restaurantNum, policeNum);
            recUsersRepository.save(recUsers);
        }

        customTrails = CustomTrails.of(
                user.getNickName(),
                null,
                0,
                dto.getRuntime(),
                dto.getDistance(),
                dto.getCalorie(),
                null,
                false,
                0,
                customTrails.getSiDo(),
                customTrails.getSiGunGo(),
                customTrails.getEupMyeonDong(),
                user);
        customTrailsRepository.save(customTrails);
    }

    @Transactional
    public void endImage(User user, Long trailsId, CustomTrailsEndImageRequestDto dto) {
        CustomTrails customTrails = customTrailsRepository.findByIdAndUserIdAndDeletedAtIsNull(trailsId, user)
                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_TRAIL));

        // imgURL을 만들어서 S3에 저장 시작
        String imgUrl = "";
        System.out.println(dto.getTrailsImg());
        if (dto.getTrailsImg() == null) {
            imgUrl = customTrails.getTrailsImg();
        } else {
            try {
                imgUrl = s3Uploader.upload(dto.getTrailsImg());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        // imgURL을 만들어서 S3에 저장 끝

        if (imgUrl.isEmpty()){
            throw new CustomException(ErrorType.NOT_FOUND_TRAIL_IMG);
        } else {
            customTrails.updateImg(imgUrl);
        }

    }
}
