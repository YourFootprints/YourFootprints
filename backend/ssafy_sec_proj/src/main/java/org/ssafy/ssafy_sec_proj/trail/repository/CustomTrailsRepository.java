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

    @Query("select c from CustomTrails c " +
            "where YEAR(c.createdAt) = :year " +
            "and MONTH(c.createdAt) = :month " +
            "and c.userId = :user " +
            "order by c.createdAt ")
    Optional<List<CustomTrails>> findCustomTrails(@Param("year") int year,
                                        @Param("month") int month,
                                        @Param("user") User user);
}
