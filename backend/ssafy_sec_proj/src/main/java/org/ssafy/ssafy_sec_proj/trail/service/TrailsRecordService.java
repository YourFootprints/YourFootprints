package org.ssafy.ssafy_sec_proj.trail.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.ssafy_sec_proj._common.dto.request.CoordinateRequestDto;
import org.ssafy.ssafy_sec_proj._common.entity.DongGeo;
import org.ssafy.ssafy_sec_proj._common.exception.CustomException;
import org.ssafy.ssafy_sec_proj._common.exception.ErrorType;
import org.ssafy.ssafy_sec_proj._common.repository.DongGeoRepository;
import org.ssafy.ssafy_sec_proj.trail.dto.response.CustomTrailDetailResponseDto;
import org.ssafy.ssafy_sec_proj.users.entity.User;


@Service
@RequiredArgsConstructor
@Transactional
public class TrailsRecordService {

    private final DongGeoRepository dongGeoRepository;


    public String findDongByXY(User user, CoordinateRequestDto dto) {

        DongGeo dongGeo = dongGeoRepository.findDongByCoordinate(dto.getX(),dto.getY());

        if (dongGeo == null) {
            throw new CustomException(ErrorType.NOT_FOUND_DONG);
        }
        return dongGeo.getEmdKorNm();
    }
}
