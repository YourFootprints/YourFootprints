package org.ssafy.ssafy_sec_proj.trail.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.ssafy_sec_proj._common.exception.CustomException;
import org.ssafy.ssafy_sec_proj._common.exception.ErrorType;
import org.ssafy.ssafy_sec_proj.trail.dto.response.CustomTrailDetailResponseDto;
import org.ssafy.ssafy_sec_proj.trail.entity.CustomTrails;
import org.ssafy.ssafy_sec_proj.trail.repository.CustomTrailRepository;
import org.ssafy.ssafy_sec_proj.users.entity.User;

@Service
@RequiredArgsConstructor
@Transactional
public class CustomTrailService {
    private final CustomTrailRepository customTrailRepository;

    // 산책 기록 상세
    public CustomTrailDetailResponseDto readCustomTrailDetail(User user, Long trailsId) {
        CustomTrails customTrails = customTrailRepository.findByIdAndUserId(trailsId, user).orElseThrow(
                () -> new CustomException(ErrorType.NOT_FOUND_TRAIL)
        );
        CustomTrailDetailResponseDto responseDto = CustomTrailDetailResponseDto.of(customTrails.getTrailsName(), customTrails.getCreatedAt(),
                customTrails.isPublic(), customTrails.getTrailsImg(), customTrails.getRuntime(), customTrails.getDistance(),customTrails.getStarRanking(), customTrails.getMemo());
        return responseDto;
    }
}
