package org.ssafy.ssafy_sec_proj._common.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.ssafy.ssafy_sec_proj._common.entity.SidoSigunguDongMapping;

import java.util.List;

public interface SiDoSigunguDongRepository extends JpaRepository<SidoSigunguDongMapping, Long> {

    @Query("SELECT d.sidoSigunguDong from SidoSigunguDongMapping d")
    List<String> findAllName();
}
