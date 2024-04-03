package org.ssafy.ssafy_sec_proj.trail.dto.response;

import lombok.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Getter
@Setter
public class CustomTrailDetailResponseDto {
    String trailsName;
    String createdAt;
    boolean isPublic;
    String trailsImg;
    String runtime;
    double distance;
    String address; // 서울 구로구 개봉동
    int starRanking;
    String memo;
    private List<CoordResponseDto> coordinateList;  // 산책로 좌표(위도, 경도)
    double centralCoordinatesLa;
    double centralCoordinatesLo;

    @Builder
    private CustomTrailDetailResponseDto(String trailsName, String createdAt, boolean isPublic, String trailsImg,
                                         String runtime, double distance, String address, int starRanking, String memo,
                                         List<CoordResponseDto> coordinateList, double centralCoordinatesLa, double centralCoordinatesLo){
        this.trailsName = trailsName;
        this.createdAt = createdAt;
        this.isPublic = isPublic;
        this.trailsImg = trailsImg;
        this.runtime = runtime;
        this.distance = distance;
        this.address = address;
        this.starRanking = starRanking;
        this.memo = memo;
        this.coordinateList = coordinateList;
        this.centralCoordinatesLa = centralCoordinatesLa;
        this.centralCoordinatesLo = centralCoordinatesLo;

    };
    public static CustomTrailDetailResponseDto of(String trailsName, LocalDateTime createdAt, boolean isPublic, String trailsImg,
                                                  String runtime, double distance, String address, int starRanking, String memo,
                                                  List<CoordResponseDto> coordinateList, double centralCoordinatesLa, double centralCoordinatesLo){
        ZonedDateTime utcTime = createdAt.atZone(ZoneId.of("UTC"));
        ZonedDateTime koreaTime = utcTime.withZoneSameInstant(ZoneId.of("Asia/Seoul"));
        DateTimeFormatter dtFmt = DateTimeFormatter.ofPattern("yyyy.MM.dd hh:mm:ss");
        return builder()
                .trailsName(trailsName)
                .createdAt(koreaTime.format(dtFmt))
                .isPublic(isPublic)
                .trailsImg(trailsImg)
                .runtime(runtime)
                .distance(distance)
                .address(address)
                .starRanking(starRanking)
                .memo(memo)
                .coordinateList(coordinateList)
                .centralCoordinatesLa(centralCoordinatesLa)
                .centralCoordinatesLo(centralCoordinatesLo)
                .build();
    }
}
