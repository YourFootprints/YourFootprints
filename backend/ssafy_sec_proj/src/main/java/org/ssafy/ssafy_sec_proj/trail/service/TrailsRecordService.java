package org.ssafy.ssafy_sec_proj.trail.service;

import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Geometry;
import org.springframework.stereotype.Service;
import org.ssafy.ssafy_sec_proj._common.dto.request.CoordinateRequestDto;
import org.ssafy.ssafy_sec_proj._common.entity.DongGeo;
import org.ssafy.ssafy_sec_proj._common.entity.SiDoGeo;
import org.ssafy.ssafy_sec_proj._common.entity.SiGunGuGeo;
import org.ssafy.ssafy_sec_proj._common.entity.SidoSigunguDongMapping;
import org.ssafy.ssafy_sec_proj._common.repository.DongGeoRepository;
import org.ssafy.ssafy_sec_proj._common.repository.SiDoGeoRepository;
import org.ssafy.ssafy_sec_proj._common.repository.SiDoSigunguDongRepository;
import org.ssafy.ssafy_sec_proj._common.repository.SiGunGuGeoRepository;
import org.ssafy.ssafy_sec_proj.users.entity.User;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class TrailsRecordService {

    private final DongGeoRepository dongGeoRepository;
    private final SiDoGeoRepository siDoGeoRepository;
    private final SiGunGuGeoRepository siGunGuGeoRepository;
    private final SiDoSigunguDongRepository siDoSigunguDongRepository;

    public String findDongByXY(User user, CoordinateRequestDto dto) {

        SiDoGeo siDoGeo = siDoGeoRepository.findSiDoByCoordinate(dto.getX(), dto.getY());
        SiGunGuGeo siGunGuGeo = siGunGuGeoRepository.findSiGunGuByCoordinate(dto.getX(), dto.getY());
        DongGeo dongGeo = dongGeoRepository.findDongByCoordinate(dto.getX(),dto.getY());
        StringBuilder sb = new StringBuilder();

        if (siDoGeo != null) {
            sb.append(siDoGeo.getSidoNm());
        }
        if (siGunGuGeo != null) {
            sb.append(" ").append(siGunGuGeo.getSigunguNm());
        }
        if (dongGeo != null) {
            sb.append(" ").append(dongGeo.getEmdKorNm());
        }

        return sb.toString();
    }

    public List<String> getFullDongNameList(User user) {
        List<String> list = siDoSigunguDongRepository.findAllName();
        return list;
    }

    public List<String> getFullDongNameLists(User user) {
        List<String> list = new ArrayList<>();
        List<SiDoGeo> siDoGeoList = siDoGeoRepository.findAllBySidoNm("제주특별자치도");
        List<SiGunGuGeo> siGunGuGeoList = siGunGuGeoRepository.findAll();
        List<DongGeo> dongGeoList = dongGeoRepository.findAll();
        List<SidoSigunguDongMapping> ans = new ArrayList<>();

        for (SiDoGeo siDoGeo : siDoGeoList) {
            for (SiGunGuGeo siGunGuGeo : siGunGuGeoList) {
                if (siDoGeo.getGeometry().intersects(siGunGuGeo.getGeometry())) {
                    Geometry intersection = siDoGeo.getGeometry().intersection(siGunGuGeo.getGeometry());
                    double intersectionArea = intersection.getArea();
                    double siGunGuArea = siGunGuGeo.getGeometry().getArea();
                    double overlapRatio = intersectionArea / siGunGuArea;
                    if (overlapRatio >= 0.5) { // 예시로 0.5라는 임계값을 설정하였습니다. 실제 사용 시 적절한 값을 설정하세요.
                        for (DongGeo dongGeo : dongGeoList) {
                            if (dongGeo.getGeometry().intersects(siGunGuGeo.getGeometry())) {
                                Geometry dongIntersection = dongGeo.getGeometry().intersection(siGunGuGeo.getGeometry());
                                double dongIntersectionArea = dongIntersection.getArea();
                                double dongArea = dongGeo.getGeometry().getArea();
                                double dongOverlapRatio = dongIntersectionArea / dongArea;
                                if (dongOverlapRatio >= 0.5) { // 예시로 0.5라는 임계값을 설정하였습니다. 실제 사용 시 적절한 값을 설정하세요.
                                    String fullName = siDoGeo.getSidoNm() + " " + siGunGuGeo.getSigunguNm() + " " + dongGeo.getEmdKorNm();
                                    list.add(fullName);
                                    SidoSigunguDongMapping s = SidoSigunguDongMapping.of(fullName);
                                    siDoSigunguDongRepository.save(s);
//                                    ans.add(SidoSigunguDongMapping.of(fullName));
                                }
                            }
                        }
                    }
                }
            }
            System.out.println("시도 : " + siDoGeo.getSidoNm());
        }
//        siDoSigunguDongRepository.saveAll(ans);
        return list;
    }
}
