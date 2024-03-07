package org.ssafy.ssafy_sec_proj._common.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.ssafy.ssafy_sec_proj._common.exception.ErrorType;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        User user = userRepository.findByKakaoEmailAndDeletedAtIsNull(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException(ErrorType.NOT_FOUND_USER.getMsg()));   // 사용자가 DB 에 없으면 예외처리

        return new UserDetailsImpl(user, user.getKakaoEmail());   // 사용자 정보를 UserDetails 로 반환
    }

}