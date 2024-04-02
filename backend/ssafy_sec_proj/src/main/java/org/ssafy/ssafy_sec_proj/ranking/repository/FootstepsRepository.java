package org.ssafy.ssafy_sec_proj.ranking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.ssafy.ssafy_sec_proj.ranking.entity.Footsteps;

import java.util.List;
import java.util.Optional;

public interface FootstepsRepository extends JpaRepository<Footsteps, Long> {
    List<Footsteps> findAllByUserId(Long user);

    List<Footsteps> findAllByAddress(String visitedLocation);

    boolean existsByLatitudeBetweenAndLongitudeBetween(double la1, double la2, double lo1, double lo2);

    @Query("select f from Footsteps f " +
            "where MONTH(f.) = :currentMonth " +
            "and f.deletedAt is null " +
            "order by f.likeNum DESC ")
    List<Footsteps> findAllByUserIdAndCreatedAt(Long user);

}
