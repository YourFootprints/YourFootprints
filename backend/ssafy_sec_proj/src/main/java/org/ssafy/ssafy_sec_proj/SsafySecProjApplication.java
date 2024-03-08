package org.ssafy.ssafy_sec_proj;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SsafySecProjApplication {

    public static void main(String[] args) {
        SpringApplication.run(SsafySecProjApplication.class, args);
    }

}
