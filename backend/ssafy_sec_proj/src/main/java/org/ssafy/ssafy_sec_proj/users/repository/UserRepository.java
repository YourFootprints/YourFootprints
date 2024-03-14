package org.ssafy.ssafy_sec_proj.users.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.ssafy_sec_proj.users.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // JPA findBy 규칙
    // select * from user_master where kakao_email = ?
    public Optional<User> findByKakaoEmailAndDeletedAtIsNull(String kakaoEmail);

    public Optional<User> findByIdAndDeletedAtIsNull(Long id);
}