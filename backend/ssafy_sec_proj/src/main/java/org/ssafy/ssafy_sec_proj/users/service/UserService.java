package org.ssafy.ssafy_sec_proj.users.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.ssafy.ssafy_sec_proj._common.exception.CustomException;
import org.ssafy.ssafy_sec_proj._common.exception.ErrorType;
import org.ssafy.ssafy_sec_proj.users.dto.LikedTrailDto;
import org.ssafy.ssafy_sec_proj.users.dto.response.UserProfileGetResponseDto;
import org.ssafy.ssafy_sec_proj.users.entity.TrailsMidLikes;
import org.ssafy.ssafy_sec_proj.users.entity.User;
import org.ssafy.ssafy_sec_proj.users.repository.TrailsMidLikesRepository;
import org.ssafy.ssafy_sec_proj.users.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final TrailsMidLikesRepository trailsMidLikesRepository;

    public UserProfileGetResponseDto getProfile(User user) {

        if (userRepository.findByKakaoEmailAndDeletedAtIsNull(user.getKakaoEmail()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }

        List<LikedTrailDto> likedTrailDtoList = new ArrayList<>();
        List<TrailsMidLikes> trailsMidLikesList = trailsMidLikesRepository.findAllByUserIdAndDeletedAtIsNull(user);
        for (TrailsMidLikes trailsMidLikes : trailsMidLikesList) {

            String address = trailsMidLikes.getTrailsId().getSiDo() + trailsMidLikes.getTrailsId().getSiGunGo() + trailsMidLikes.getTrailsId().getEupMyeonDong();
            String[] runtimeString = trailsMidLikes.getTrailsId().getRuntime().split(":");
            int runtimeInt = Integer.parseInt(runtimeString[0]) + Integer.parseInt(runtimeString[1]);
            likedTrailDtoList.add(LikedTrailDto.of(trailsMidLikes.getId(), trailsMidLikes.getTrailsId().getTrailsImg(), trailsMidLikes.getTrailsId().getLikeNum(),
                    trailsMidLikes.getTrailsId().getDistance(), runtimeInt, address, true));
        }

        UserProfileGetResponseDto userProfileGetResponseDto = UserProfileGetResponseDto.of(user.getNickName(), user.getVisitedLocation(), user.getPreferDurationS(),
                user.getPreferDurationE(), user.getKakaoProfileImg(), user.getKakaoEmail(), likedTrailDtoList);
        return userProfileGetResponseDto;
    }
}
