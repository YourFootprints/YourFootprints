package org.ssafy.ssafy_sec_proj.ranking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.ssafy_sec_proj.ranking.entity.Footsteps;

public interface FootstepsRepository extends JpaRepository<Footsteps, Long> {
}
