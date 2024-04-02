package org.ssafy.ssafy_sec_proj.ranking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.ssafy_sec_proj.ranking.entity.RecommendTrails;

import java.util.List;
import java.util.Optional;

public interface RecommendTrailsRepository extends JpaRepository<RecommendTrails, Long> {
    Optional<List<RecommendTrails>> findAllByClusterAndDeletedAtIsNull(Long cluster);
}
