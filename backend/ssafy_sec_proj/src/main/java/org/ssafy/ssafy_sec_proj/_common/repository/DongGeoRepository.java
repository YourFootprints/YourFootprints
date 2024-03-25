package org.ssafy.ssafy_sec_proj._common.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.ssafy.ssafy_sec_proj._common.entity.DongGeo;

public interface DongGeoRepository extends JpaRepository<DongGeo, Long> {

    @Query(value = "SELECT d FROM DongGeo d WHERE ST_Contains(d.geometry, ST_GeomFromText(CONCAT('POINT(', :x, ' ', :y, ')'), 4326)) = true")
    DongGeo findDongByCoordinate(@Param("x") double x, @Param("y") double y);

}
