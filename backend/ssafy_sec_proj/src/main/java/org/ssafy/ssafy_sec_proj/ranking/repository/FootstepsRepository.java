package org.ssafy.ssafy_sec_proj.ranking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.ssafy.ssafy_sec_proj.ranking.entity.Footsteps;

import java.util.List;
import java.util.Optional;

public interface FootstepsRepository extends JpaRepository<Footsteps, Long> {
    List<Footsteps> findAllByUserId(Long user);

    List<Footsteps> findAllByAddress(String visitedLocation);

    boolean existsByLatitudeBetweenAndLongitudeBetween(double la1, double la2, double lo1, double lo2);

    @Query("select f from Footsteps f " +
            "where f.userId = :user " +
            "and MONTH(f.createdAt) = :currentMonth " +
            "and f.deletedAt is null ")
    List<Footsteps> findAllByUserIdAndCreatedAt(@Param("user") Long user,
                                                @Param("currentMonth") int currentMonth);

}
