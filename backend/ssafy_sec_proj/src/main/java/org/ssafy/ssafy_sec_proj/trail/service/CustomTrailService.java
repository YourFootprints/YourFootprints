package org.ssafy.ssafy_sec_proj.trail.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.ssafy_sec_proj._common.exception.CustomException;
import org.ssafy.ssafy_sec_proj._common.exception.ErrorType;
import org.ssafy.ssafy_sec_proj.trail.dto.request.CustomTrailsCreateRequestDto;
import org.ssafy.ssafy_sec_proj.trail.dto.response.CalenderRecordListResponseDto;
import org.ssafy.ssafy_sec_proj.trail.dto.response.CalenderRecordResponseDto;
import org.ssafy.ssafy_sec_proj.trail.dto.response.CustomTrailDetailResponseDto;
import org.ssafy.ssafy_sec_proj.trail.dto.response.CustomTrailsCreateResponseDto;
import org.ssafy.ssafy_sec_proj.trail.entity.CustomTrails;
import org.ssafy.ssafy_sec_proj.trail.repository.CustomTrailsRepository;
import org.ssafy.ssafy_sec_proj.users.entity.User;
import org.ssafy.ssafy_sec_proj.users.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CustomTrailService {
    private final CustomTrailsRepository customTrailsRepository;
    private final UserRepository userRepository;

    // 산책 기록 상세
    public CustomTrailDetailResponseDto readCustomTrailDetail(User user, Long trailsId) {
        CustomTrails customTrails = customTrailsRepository.findByIdAndUserId(trailsId, user).orElseThrow(
                () -> new CustomException(ErrorType.NOT_FOUND_TRAIL)
        );
        CustomTrailDetailResponseDto responseDto = CustomTrailDetailResponseDto.of(customTrails.getTrailsName(), customTrails.getCreatedAt(),
                customTrails.isPublic(), customTrails.getTrailsImg(), customTrails.getRuntime(), customTrails.getDistance(),customTrails.getStarRanking(), customTrails.getMemo());
        return responseDto;
    }

    // 캘린더 기록
    public CalenderRecordListResponseDto readCalenderRecords(User user, int year, int month){
        List<CustomTrails> calenderList= customTrailsRepository.findCustomTrails(year, month, user).orElse(null);
        CalenderRecordListResponseDto responseDto = CalenderRecordListResponseDto.from(
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

    // 커스텀 산책로 만들기
    public CustomTrailsCreateResponseDto createCustomTrail(CustomTrailsCreateRequestDto dto, User user) {
        if (userRepository.findByKakaoEmailAndDeletedAtIsNull(user.getKakaoEmail()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }
        CustomTrails customTrails = CustomTrails.of(user.getNickName(), null, 0, dto.getRuntime(), dto.getDistance(), dto.getCalorie(), null, false, 0, "구미시", "", "진평동", user);
        CustomTrails savedCustomTrails = customTrailsRepository.save(customTrails);
        return CustomTrailsCreateResponseDto.of(savedCustomTrails.getId());
    }
}
