package org.ssafy.ssafy_sec_proj.users.dto.response;

import lombok.Builder;
import lombok.Getter;
import org.ssafy.ssafy_sec_proj.users.dto.LikedTrailDto;

import java.util.List;

@Getter
public class UserProfileEditResponseDto {

    String nickName;
    String address;
    int requiredTimeStart;
    int requiredTimeEnd;
    String profileImg;

    @Builder
    private UserProfileEditResponseDto(String nickName, String address, int requiredTimeStart, int requiredTimeEnd, String profileImg) {
        this.nickName = nickName;
        this.address = address;
        this.requiredTimeStart = requiredTimeStart;
        this.requiredTimeEnd = requiredTimeEnd;
        this.profileImg = profileImg;
    }

    public static UserProfileEditResponseDto of(String nickName, String address, int requiredTimeStart, int requiredTimeEnd , String profileImg) {
        return builder()
                .nickName(nickName)
                .address(address)
                .requiredTimeStart(requiredTimeStart)
                .requiredTimeEnd(requiredTimeEnd)
                .profileImg(profileImg)
                .build();
    }
}
