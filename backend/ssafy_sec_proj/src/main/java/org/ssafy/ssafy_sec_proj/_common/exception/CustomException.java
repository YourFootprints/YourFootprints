package org.ssafy.ssafy_sec_proj._common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CustomException extends RuntimeException{

    private final ErrorType errorType;

    @Override
    public String getMessage() {
        return errorType.getMsg();
    }
}
