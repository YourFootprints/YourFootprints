package org.ssafy.ssafy_sec_proj.trail.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.ssafy.ssafy_sec_proj.trail.entity.CustomTrails;
import org.ssafy.ssafy_sec_proj.trail.entity.SpotLists;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface SpotListsRepository extends JpaRepository<SpotLists, Long> {
    Optional<List<SpotLists>> findAllByCustomTrailsIdAndDeletedAtIsNull(CustomTrails customTrailsId);

    Optional<List<SpotLists>> findByCustomTrailsIdAndDeletedAtIsNull(CustomTrails customTrailsId);

    @Query("SELECT s FROM SpotLists s " +
            "WHERE s.duration >= :minDuration " +
            "AND s.id IN (" +
            "   SELECT s2.id FROM SpotLists s2 " +
            "   WHERE s2.la = s.la AND s2.lo = s.lo " +
            "   GROUP BY s2.la, s2.lo " +
            "   HAVING COUNT(s2.id) >= :minCount" +
            ")")
    List<SpotLists> findSpotListsByDurationAndLocationCount(LocalDateTime minDuration, int minCount);
    List<SpotLists> findByDurationGreaterThanEqualAndCreatedAtAfterAndDeletedAtIsNull(LocalTime duration, LocalDateTime createdAt);
}
