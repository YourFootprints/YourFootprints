package org.ssafy.ssafy_sec_proj._common.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.ssafy.ssafy_sec_proj._common.entity.SiGunGuGeo;

import java.util.List;

public interface SiGunGuGeoRepository extends JpaRepository<SiGunGuGeo, Long> {

    @Query(value = "SELECT d FROM SiGunGuGeo d WHERE ST_Contains(d.geometry, ST_GeomFromText(CONCAT('POINT(', :x, ' ', :y, ')'), 4326))")
    SiGunGuGeo findSiGunGuByCoordinate(@Param("x") double x, @Param("y") double y);

    @Query("SELECT d.sigunguNm from SiGunGuGeo d")
    List<String> findAllSiGunGuName();
}
