package org.ssafy.ssafy_sec_proj.trail.repository;

import org.checkerframework.checker.nullness.Opt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.ssafy.ssafy_sec_proj.trail.entity.CustomTrails;
import org.ssafy.ssafy_sec_proj.users.entity.User;

import java.util.List;
import java.util.Optional;

import java.util.Optional;

public interface CustomTrailsRepository extends JpaRepository<CustomTrails, Long> {
    Optional<CustomTrails> findByIdAndUserIdAndDeletedAtIsNull(Long id, User user);

    @Query("select c from CustomTrails c " +
            "where YEAR(c.createdAt) = :year " +
            "and MONTH(c.createdAt) = :month " +
            "and c.userId = :user " +
            "and c.deletedAt is null " +
            "order by c.createdAt ")
    Optional<List<CustomTrails>> findCustomTrails(@Param("year") int year,
                                        @Param("month") int month,
                                        @Param("user") User user);

    Optional<CustomTrails> findByIdAndDeletedAtIsNull(Long trailsId);

    Optional<List<CustomTrails>> findAllByUserIdAndDeletedAtIsNull(User user);

    Optional<List<CustomTrails>> findAllByIsPublicIsTrueAndDeletedAtIsNullOrderByLikeNumDesc();

    @Query("select c from CustomTrails c " +
            "where c.siDo = :siDo " +
            "and c.siGunGo = :siGunGo " +
            "and c.eupMyeonDong = :eupMyeonDong " +
            "and c.isPublic = TRUE " +
            "and c.deletedAt is null " +
            "order by c.likeNum DESC ")
    Optional<List<CustomTrails>> findAllCustomTrailsBySiDoAndSiGunGoAndEupMyeonDong(@Param("siDo") String siDo,
                                                  @Param("siGunGo") String siGunGo,
                                                  @Param("eupMyeonDong") String eupMyeonDong);

    @Query("select c from CustomTrails c " +
            "where cast(substring(c.runtime, 1, 1) as integer) * 60 +  cast(substring(c.runtime, 3, 2) as integer) between :startTime and :endTime " +
            "and c.isPublic = TRUE " +
            "and c.deletedAt is null " +
            "order by c.likeNum DESC ")
    Optional<List<CustomTrails>> findAllCustomTrailsByRuntime(@Param("startTime") int startTime,
                                                              @Param("endTime") int endTime);

    @Query("select c from CustomTrails c " +
            "where cast(substring(c.runtime, 1, 1) as integer) * 60 +  cast(substring(c.runtime, 3, 2) as integer) between :startTime and :endTime " +
            "and c.siDo = :siDo " +
            "and c.siGunGo = :siGunGo " +
            "and c.eupMyeonDong = :eupMyeonDong " +
            "and c.isPublic = TRUE " +
            "and c.deletedAt is null " +
            "order by c.likeNum DESC ")
    Optional<List<CustomTrails>> findAllCustomTrailsBySiDoAndSiGunGoAndEupMyeonDongAndRuntime(@Param("siDo") String siDo,
                                                                                              @Param("siGunGo") String siGunGo,
                                                                                              @Param("eupMyeonDong") String eupMyeonDong,
                                                                                              @Param("startTime") int startTime,
                                                                                              @Param("endTime") int endTime);

    int countByUserIdAndDeletedAtIsNull(Long userId);

    @Query("select c from CustomTrails c " +
            "where MONTH(c.createdAt) = :currentMonth " +
            "and c.deletedAt is null " +
            "order by c.likeNum DESC ")
    Optional<List<CustomTrails>> findAllCustomTrailsByCreatedAtAndDeletedAtIsNull(@Param("currentMonth") int currentMonth);

    @Query("select c from CustomTrails c " +
            "where c.id in :ids " +
            "and c.deletedAt is null " +
            "and c.siDo = :siDo " +
            "and c.siGunGo = :siGunGo " +
            "order by c.likeNum desc " +
            "limit 5 ")
    Optional<List<CustomTrails>>  findAllByIdAndDeletedAtIsNullOrderByLikeNum(@Param("ids") List<Long> ids,
                                                                              @Param("siDo") String siDo,
                                                                              @Param("siGunGo") String siGunGo);

    Optional<List<CustomTrails>> findTop5ByIsPublicIsTrueAndSiDoAndSiGunGoAndDeletedAtIsNullOrderByLikeNumDesc(String siDo, String siGunGo);

    @Query("select c, f from CustomTrails c " +
            "inner join TrailsAroundFacility f on c.id = f.trailsId.id " +
            "where c.isPublic = true " +
            "and c.siDo = :siDo " +
            "and c.siGunGo = :siGunGo " +
            "and c.deletedAt is null " +
            "order by f.policeNum desc , f.cctvNum desc " +
            "limit 5 ")
    Optional<List<CustomTrails>> findTop5ByIsPublicIsTrueAndSiDoAndSiGunGoAndDeletedAtIsNull(@Param("siDo") String siDo,
                                                                                   @Param("siGunGo") String siGunGo);


}
