package org.ssafy.ssafy_sec_proj.users.dto.response;

import lombok.Builder;
import lombok.Getter;
import org.ssafy.ssafy_sec_proj.users.dto.LikedTrailDto;

import java.util.List;

@Getter
public class UserProfileGetResponseDto {

    String nickName;
    String address;
    int requiredTimeStart;
    int requiredTimeEnd;
    String profileImg;
    String profileEmail;
    List<LikedTrailDto> LikedTrailDtos;

    @Builder
    private UserProfileGetResponseDto(String nickName, String address, int requiredTimeStart, int requiredTimeEnd, String profileImg, String profileEmail, List<LikedTrailDto> likedTrailDtos) {
        this.nickName = nickName;
        this.address = address;
        this.requiredTimeStart = requiredTimeStart;
        this.requiredTimeEnd = requiredTimeEnd;
        this.profileImg = profileImg;
        this.profileEmail = profileEmail;
        LikedTrailDtos = likedTrailDtos;
    }

    public static UserProfileGetResponseDto of(String nickName, String address, int requiredTimeStart,int requiredTimeEnd , String profileImg,
                                            String profileEmail, List<LikedTrailDto> likedTrailDtos) {
        return builder()
                .nickName(nickName)
                .address(address)
                .requiredTimeStart(requiredTimeStart)
                .requiredTimeEnd(requiredTimeEnd)
                .profileImg(profileImg)
                .profileEmail(profileEmail)
                .likedTrailDtos(likedTrailDtos)
                .build();
    }
}
