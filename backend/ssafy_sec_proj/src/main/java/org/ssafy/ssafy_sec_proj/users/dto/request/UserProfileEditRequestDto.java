package org.ssafy.ssafy_sec_proj.users.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import org.ssafy.ssafy_sec_proj.users.dto.response.UserProfileEditResponseDto;

@Getter
@Setter
public class UserProfileEditRequestDto {

    private String nickName;
    private String address;
    private int requiredTimeStart;
    private int requiredTimeEnd;
    private MultipartFile imgUrl;
}
