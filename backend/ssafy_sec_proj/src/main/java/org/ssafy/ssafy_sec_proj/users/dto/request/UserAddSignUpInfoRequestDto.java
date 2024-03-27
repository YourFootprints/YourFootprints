package org.ssafy.ssafy_sec_proj.users.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAddSignUpInfoRequestDto {

    private String nickName;
    private String address;
    private int requiredTimeStart;
    private int requiredTimeEnd;
}
