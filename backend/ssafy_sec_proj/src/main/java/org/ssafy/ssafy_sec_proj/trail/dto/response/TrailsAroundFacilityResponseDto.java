package org.ssafy.ssafy_sec_proj.trail.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpEntity;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TrailsAroundFacilityResponseDto {
    String nickName;
    String runtime;
    double distance;
    String siDo; // 산책 시작할 떼 있는 주소
    String siGunDo;
    String eupMyeonDong;
    boolean isPublic;
    int starRanking;
    String memo;
    boolean isLike;
    int likedNum;
    private List<CoordResponseDto> coordinateList;  // 산책로 좌표(위도, 경도)
//    private Map<String, List<String>> facilityList; // 시설 목록
    private List<AroundFacilityResponseDto> facilityList;
    double centralCoordinatesLa;
    double centralCoordinatesLo;

    @Builder
    public TrailsAroundFacilityResponseDto(String nickName, String runtime, double distance, String siDo, String siGunDo, String eupMyeonDong, boolean isPublic, int starRanking, String memo, boolean isLike, int likedNum, List<CoordResponseDto> coordinateList, List<AroundFacilityResponseDto> facilityList, double centralCoordinatesLa, double centralCoordinatesLo) {
        this.nickName = nickName;
        this.runtime = runtime;
        this.distance = distance;
        this.siDo = siDo;
        this.siGunDo = siGunDo;
        this.eupMyeonDong = eupMyeonDong;
        this.isPublic = isPublic;
        this.starRanking = starRanking;
        this.memo = memo;
        this.isLike = isLike;
        this.likedNum = likedNum;
        this.coordinateList = coordinateList;
        this.facilityList = facilityList;
        this.centralCoordinatesLa = centralCoordinatesLa;
        this.centralCoordinatesLo = centralCoordinatesLo;
    }

    public static TrailsAroundFacilityResponseDto of(String nickName, String runtime, double distance, String siDo, String siGunDo, String eupMyeonDong, boolean isPublic, int starRanking, String memo, boolean isLike, int likedNum, List<CoordResponseDto> coordinateList, List<AroundFacilityResponseDto>facilityList, double centralCoordinatesLa, double centralCoordinatesLo) {
        return builder()
                .nickName(nickName)
                .runtime(runtime)
                .distance(distance)
                .siDo(siDo)
                .siGunDo(siGunDo)
                .eupMyeonDong(eupMyeonDong)
                .isPublic(isPublic)
                .starRanking(starRanking)
                .memo(memo)
                .isLike(isLike)
                .likedNum(likedNum)
                .coordinateList(coordinateList)
                .facilityList(facilityList)
                .centralCoordinatesLa(centralCoordinatesLa)
                .centralCoordinatesLo(centralCoordinatesLo)
                .build();

    }
}
