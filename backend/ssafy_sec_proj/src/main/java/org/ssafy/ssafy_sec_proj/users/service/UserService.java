package org.ssafy.ssafy_sec_proj.users.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.ssafy.ssafy_sec_proj._common.exception.CustomException;
import org.ssafy.ssafy_sec_proj._common.exception.ErrorType;
import org.ssafy.ssafy_sec_proj._common.response.MsgType;
import org.ssafy.ssafy_sec_proj._common.service.S3Uploader;
import org.ssafy.ssafy_sec_proj.users.dto.LikedTrailDto;
import org.ssafy.ssafy_sec_proj.users.dto.request.UserProfileEditRequestDto;
import org.ssafy.ssafy_sec_proj.users.dto.response.UserProfileEditResponseDto;
import org.ssafy.ssafy_sec_proj.users.dto.response.UserProfileGetResponseDto;
import org.ssafy.ssafy_sec_proj.users.entity.TrailsMidLikes;
import org.ssafy.ssafy_sec_proj.users.entity.User;
import org.ssafy.ssafy_sec_proj.users.repository.TrailsMidLikesRepository;
import org.ssafy.ssafy_sec_proj.users.repository.UserRepository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final TrailsMidLikesRepository trailsMidLikesRepository;
    private final S3Uploader s3Uploader;

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

    public UserProfileEditResponseDto editProfile(User user, UserProfileEditRequestDto dto) throws IOException {

        if (userRepository.findByKakaoEmailAndDeletedAtIsNull(user.getKakaoEmail()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }

        // imgURL을 만들어서 S3에 저장 시작
        String imgUrl = "";
        System.out.println(dto.getImgUrl());
        if (dto.getImgUrl() == null) {
            imgUrl = "https://ssafys3.s3.ap-northeast-2.amazonaws.com/static/%EC%9D%B4%EC%A6%88%EB%A6%AC%EC%96%BC.jpg";
        } else {
            imgUrl = s3Uploader.upload(dto.getImgUrl());
        }
        // imgURL을 만들어서 S3에 저장 끝

        user.updateProfile(dto.getNickName(), dto.getAddress(), dto.getRequiredTimeStart(), dto.getRequiredTimeEnd(), imgUrl);
        userRepository.save(user);
        UserProfileEditResponseDto userProfileEditResponseDto = UserProfileEditResponseDto.of(dto.getNickName(), dto.getAddress(), dto.getRequiredTimeStart()
                , dto.getRequiredTimeEnd(), imgUrl);
        return userProfileEditResponseDto;
    }
}
