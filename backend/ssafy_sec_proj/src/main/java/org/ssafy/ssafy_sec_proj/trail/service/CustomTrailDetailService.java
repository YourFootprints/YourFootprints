package org.ssafy.ssafy_sec_proj.trail.service;

import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.ssafy_sec_proj._common.exception.CustomException;
import org.ssafy.ssafy_sec_proj._common.exception.ErrorType;
import org.ssafy.ssafy_sec_proj.trail.dto.response.CustomTrailDetailResponseDto;
import org.ssafy.ssafy_sec_proj.trail.entity.CustomTrails;
import org.ssafy.ssafy_sec_proj.trail.repository.CustomTrailsRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class CustomTrailDetailService {
    private final CustomTrailsRepository customTrailsRepository;

    // 산책 기록 상세
    public CustomTrailDetailResponseDto readCustomTrailDetail(Long trailsId) {
        CustomTrails customTrails = customTrailsRepository.findById(trailsId).orElseThrow(
                () -> new CustomException(ErrorType.NOT_FOUND_TRAIL)
        );
        CustomTrailDetailResponseDto responseDto = CustomTrailDetailResponseDto.of(customTrails.getTrailsName(), customTrails.getCreatedAt(),
                customTrails.isPublic(), customTrails.getTrailsImg(), customTrails.getRuntime(), customTrails.getDistance(),customTrails.getStarRanking(), customTrails.getMemo());
        return responseDto;
    }
}
