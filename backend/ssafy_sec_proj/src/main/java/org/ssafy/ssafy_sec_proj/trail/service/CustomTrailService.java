package org.ssafy.ssafy_sec_proj.trail.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.ssafy_sec_proj._common.exception.CustomException;
import org.ssafy.ssafy_sec_proj._common.exception.ErrorType;
import org.ssafy.ssafy_sec_proj.trail.dto.response.*;
import org.ssafy.ssafy_sec_proj.trail.entity.CustomTrails;
import org.ssafy.ssafy_sec_proj.trail.entity.SpotLists;
import org.ssafy.ssafy_sec_proj.trail.repository.CustomTrailsRepository;
import org.ssafy.ssafy_sec_proj.trail.repository.SpotListsRepository;
import org.ssafy.ssafy_sec_proj.users.entity.TrailsMidLikes;
import org.ssafy.ssafy_sec_proj.users.entity.User;
import org.ssafy.ssafy_sec_proj.users.repository.TrailsMidLikesRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CustomTrailService {
    private final CustomTrailsRepository customTrailsRepository;
    private final TrailsMidLikesRepository trailsMidLikesRepository;
    private final SpotListsRepository spotListsRepository;

    // 산책 기록 상세
    public CustomTrailDetailResponseDto readCustomTrailDetail(User user, Long trailsId) {
        CustomTrails customTrails = customTrailsRepository.findByIdAndUserIdAndDeletedAtIsNull(trailsId, user).orElseThrow(
                () -> new CustomException(ErrorType.NOT_FOUND_TRAIL)
        );


        CustomTrailDetailResponseDto responseDto = CustomTrailDetailResponseDto.of(customTrails.getTrailsName(), customTrails.getCreatedAt(),
                customTrails.isPublic(), customTrails.getTrailsImg(), customTrails.getRuntime(), customTrails.getDistance(),
                customTrails.getSiDo() + " "  + customTrails.getSiDo() + " " + customTrails.getEupMyeonDong(),
                customTrails.getStarRanking(), customTrails.getMemo());
        return responseDto;
    }

    // 캘린더 기록
    public RecordListResponseDto readCalenderRecords(User user, int year, int month){
        List<CustomTrails> calenderList = customTrailsRepository.findCustomTrails(year, month, user).orElse(null);
        RecordListResponseDto responseDto = RecordListResponseDto.from(
                calenderList
                        .stream()
                        .map(c -> CalenderRecordResponseDto.of(
                                c.getCreatedAt(),
                                c.getTrailsName(),
                                c.getRuntime(),
                                c.getDistance()
                        ))
                        .toList());
        return responseDto;

    }

    // 산책 기록
    public RecordListResponseDto readRecords(User user){
        List<CustomTrails> recordList = customTrailsRepository.findAllByUserIdAndDeletedAtIsNull(user).orElse(null);
        RecordListResponseDto responseDto = RecordListResponseDto.from(
                recordList
                        .stream()
                        .map(r -> RecordResponseDto.of(
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
}
