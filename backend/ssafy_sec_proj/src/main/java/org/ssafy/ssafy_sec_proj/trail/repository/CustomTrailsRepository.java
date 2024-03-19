package org.ssafy.ssafy_sec_proj.trail.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.ssafy.ssafy_sec_proj.trail.entity.CustomTrails;
import org.ssafy.ssafy_sec_proj.users.entity.User;

import java.util.List;
import java.util.Optional;

public interface CustomTrailsRepository extends JpaRepository<CustomTrails, Long> {
    Optional<CustomTrails> findByIdAndUserId(Long id, User user);

    @Query("SELECT c FROM CustomTrails c " +
            "WHERE YEAR(c.createdAt) = :year " +
            "AND MONTH(c.createdAt) = :month " +
            "AND c.userId = :user " +
            "ORDER BY c.createdAt ")
    List<CustomTrails> findCustomTrails(@Param("year") int year,
                                        @Param("month") int month,
                                        @Param("user") User user);
}
