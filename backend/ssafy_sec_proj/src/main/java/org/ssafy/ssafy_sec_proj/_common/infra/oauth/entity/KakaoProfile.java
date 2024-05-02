package org.ssafy.ssafy_sec_proj._common.infra.oauth.entity;

import lombok.Data;

@Data
public class KakaoProfile {

    private Long id;
    private String connected_at;
    private Properties properties;
    private KakaoAccount kakao_account;
    private boolean setPrivacyInfo;

    @Data
    public static class Properties {
        private String nickname;
        private String profile_image;
        private String thumbnail_image;
    }

    @Data
    public static class KakaoAccount {
        private Boolean profile_nickname_needs_agreement;
        private Boolean profile_image_needs_agreement;
        private Profile profile;
        private Boolean has_email;
        private Boolean email_needs_agreement;
        private Boolean is_email_valid;
        private Boolean is_email_verified;
        private String email;
        private String gender;
        private String age_range; // 연령대 필드 추가
        private String age_range_needs_agreement;
        private String has_age_range;
        private String has_gender;
        private String gender_needs_agreement;
        private boolean name_needs_agreement;
        private String name;

        @Data
        public static class Profile {
            private String nickname;
            private String thumbnail_image_url;
            private String profile_image_url;
            private Boolean is_default_nickname; // 추가
            private Boolean is_default_image;
        }
    }
}
