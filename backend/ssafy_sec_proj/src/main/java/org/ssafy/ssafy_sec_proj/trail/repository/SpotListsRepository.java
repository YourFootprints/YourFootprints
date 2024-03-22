package org.ssafy.ssafy_sec_proj.trail.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.ssafy_sec_proj.trail.entity.CustomTrails;
import org.ssafy.ssafy_sec_proj.trail.entity.SpotLists;

import java.util.List;
import java.util.Optional;

public interface SpotListsRepository extends JpaRepository<SpotLists, Long> {
    Optional<List<SpotLists>> findAllByCustomTrailsIdAndDeletedAtIsNull(Long customTrailsId);
}
