package org.ssafy.ssafy_sec_proj.users.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.ssafy.ssafy_sec_proj._common.entity.BaseTime;
import org.ssafy.ssafy_sec_proj.trail.entity.CustomTrails;

import java.util.Map;


@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
// DB 테이블명이 클래스명과 다를 시 작성
@Table(name = "users")
@SQLDelete(sql = "UPDATE users set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
@Getter
public class User extends BaseTime {

    @Id
    // auto_increment로 설정했다면 타입 설정할 것
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // 필드명이 다를 시 설정
    @Column(name = "id")
    private Long id;

    @Column(name = "kakao_uuid", nullable = false)
    private Long kakaoUuid;

    @Column(name = "gender",nullable = true, length = 4)
    private String gender;

    @Column(name = "age_range", nullable = true)
    private String ageRange;

    @Column(name = "kakao_profile_img",nullable = false, length = 250)
    private String kakaoProfileImg;

    @Column(name = "user_name",nullable = false, length = 15)
    private String userName;

    @Column(name = "kakao_email",nullable = false, length = 50)
    private String kakaoEmail;

    @Column(name = "nick_name",nullable = true, length = 20)
    private String nickName;

    @Column(name = "visited_location",nullable = true, length = 50)
    private String visitedLocation;

    @Column(name = "prefer_duration_s", nullable = true)
    private int preferDurationS;

    @Column(name = "prefer_duration_e", nullable = true)
    private int preferDurationE;

    @Column(name = "user_role",nullable = false, length = 30)
    private String userRole;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rec_users")
    public RecUsers recUsers;

    @Builder
    private User(Long kakaoUuid, String gender, String ageRange, String kakaoProfileImg, String userName, String kakaoEmail, String nickName,
                 String visitedLocation, int preferDurationS, int preferDurationE, String userRole, RecUsers recUsers) {
        this.kakaoUuid = kakaoUuid;
        this.gender = gender;
        this.ageRange = ageRange;
        this.kakaoProfileImg = kakaoProfileImg;
        this.userName = userName;
        this.kakaoEmail = kakaoEmail;
        this.nickName = nickName;
        this.visitedLocation = visitedLocation;
        this.preferDurationS = preferDurationS;
        this.preferDurationE = preferDurationE;
        this.userRole = userRole;
        this.recUsers = recUsers;
    }

    public static User of(Long kakaoUuid, String gender, String ageRange, String kakaoProfileImg, String userName, String kakaoEmail
            , String nickName, String visitedLocation, int preferDurationS, int preferDurationE, String userRole,RecUsers recUsers) {
        return builder()
                .kakaoUuid(kakaoUuid)
                .gender(gender)
                .ageRange(ageRange)
                .kakaoProfileImg(kakaoProfileImg)
                .userName(userName)
                .kakaoEmail(kakaoEmail)
                .nickName(nickName)
                .visitedLocation(visitedLocation)
                .preferDurationS(preferDurationS)
                .preferDurationE(preferDurationE)
                .userRole(userRole)
                .recUsers(recUsers)
                .build();
    }

    public void updateProfile(String nickName, String address, int requiredTimeStart, int requiredTimeEnd, String imgUrl) {
        if (nickName != null && !nickName.isEmpty()) {
            this.nickName = nickName;
        }

        if (address != null && !address.isEmpty()) {
            this.visitedLocation = address;
        }

        if (requiredTimeStart != 0) {
            this.preferDurationS = requiredTimeStart;
        }

        if (requiredTimeEnd != 0) {
            this.preferDurationE = requiredTimeEnd;
        }

        if (imgUrl != null && !imgUrl.isEmpty()) {
            this.kakaoProfileImg = imgUrl;
        }
    }

    public void addUserSignUpInfo(String nickName, String address, int requiredTimeStart, int requiredTimeEnd){
        if (nickName != null && !nickName.isEmpty()) {
            this.nickName = nickName;
        }
        if (address != null && !address.isEmpty()) {
            this.visitedLocation = address;
        }
        if (requiredTimeStart != 0) {
            this.preferDurationS = requiredTimeStart;
        }
        if (requiredTimeEnd != 0) {
            this.preferDurationE = requiredTimeEnd;
        }

    }
}
