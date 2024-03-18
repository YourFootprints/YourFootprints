package org.ssafy.ssafy_sec_proj.users.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.ssafy_sec_proj.users.entity.TrailsMidLikes;
import org.ssafy.ssafy_sec_proj.users.entity.User;

import java.util.List;

public interface TrailsMidLikesRepository extends JpaRepository<TrailsMidLikes, Long> {

    List<TrailsMidLikes> findAllByUserIdAndDeletedAtIsNull(User user);
}
