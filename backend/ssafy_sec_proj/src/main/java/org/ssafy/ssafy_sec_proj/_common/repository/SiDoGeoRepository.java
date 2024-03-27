package org.ssafy.ssafy_sec_proj._common.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.ssafy.ssafy_sec_proj._common.entity.SiDoGeo;

import java.util.List;

public interface SiDoGeoRepository extends JpaRepository<SiDoGeo, Long> {

    @Query(value = "SELECT d FROM SiDoGeo d WHERE ST_Contains(d.geometry, ST_GeomFromText(CONCAT('POINT(', :x, ' ', :y, ')'), 4326))")
    SiDoGeo findSiDoByCoordinate(@Param("x") double x, @Param("y") double y);

    @Query("SELECT d.sidoNm from SiDoGeo d")
    List<String> findAllSiDoName();
}
