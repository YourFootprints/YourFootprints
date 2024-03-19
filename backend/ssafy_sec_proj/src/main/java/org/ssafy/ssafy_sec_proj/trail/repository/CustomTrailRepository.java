package org.ssafy.ssafy_sec_proj.trail.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.ssafy_sec_proj.trail.entity.CustomTrails;
import org.ssafy.ssafy_sec_proj.users.entity.User;

import java.util.Optional;

public interface CustomTrailRepository extends JpaRepository<CustomTrails, Long> {
    Optional<CustomTrails> findByIdAndUserId(Long id, User user);
}
