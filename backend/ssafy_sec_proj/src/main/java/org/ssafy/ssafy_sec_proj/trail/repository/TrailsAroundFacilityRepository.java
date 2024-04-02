package org.ssafy.ssafy_sec_proj.trail.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.ssafy_sec_proj.trail.entity.CustomTrails;
import org.ssafy.ssafy_sec_proj.trail.entity.TrailsAroundFacility;

import java.util.List;
import java.util.Optional;

public interface TrailsAroundFacilityRepository extends JpaRepository<TrailsAroundFacility, Long> {
//    Optional<List<TrailsAroundFacility>> findTop5ByPoliceNumAndCctvNumAndDeletedAtIsNullAndIsPublic();
}
