package org.ssafy.ssafy_sec_proj.trail.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.ssafy_sec_proj.trail.entity.CustomTrails;

public interface SpotListsRepository extends JpaRepository<CustomTrails, Long> {

}