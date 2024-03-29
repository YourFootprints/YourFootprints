package org.ssafy.ssafy_sec_proj.users.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.ssafy_sec_proj.users.entity.RecUsers;

public interface RecUsersRepository extends JpaRepository<RecUsers, Long> {
}
