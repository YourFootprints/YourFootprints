package org.ssafy.ssafy_sec_proj.users.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.ssafy.ssafy_sec_proj._common.exception.CustomException;
import org.ssafy.ssafy_sec_proj._common.exception.ErrorType;
import org.ssafy.ssafy_sec_proj._common.service.S3Uploader;
import org.ssafy.ssafy_sec_proj.trail.entity.CustomTrails;
import org.ssafy.ssafy_sec_proj.trail.repository.CustomTrailsRepository;
import org.ssafy.ssafy_sec_proj.users.dto.LikedTrailDto;
import org.ssafy.ssafy_sec_proj.users.dto.request.UserAddLikeListRequestDto;
import org.ssafy.ssafy_sec_proj.users.dto.request.UserAddSignUpInfoRequestDto;
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
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final TrailsMidLikesRepository trailsMidLikesRepository;
    private final S3Uploader s3Uploader;
    private final CustomTrailsRepository customTrailsRepository;

    public UserProfileGetResponseDto getProfile(User user) {

        if (userRepository.findByKakaoEmailAndDeletedAtIsNull(user.getKakaoEmail()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }

        List<LikedTrailDto> likedTrailDtoList = new ArrayList<>();
        List<TrailsMidLikes> trailsMidLikesList = trailsMidLikesRepository.findAllByUserIdAndDeletedAtIsNull(user);
        for (TrailsMidLikes trailsMidLikes : trailsMidLikesList) {

            String address = trailsMidLikes.getTrailsId().getSiGunGo() + " " + trailsMidLikes.getTrailsId().getEupMyeonDong();
            String[] runtimeString = trailsMidLikes.getTrailsId().getRuntime().split(":");
            int runtimeInt = Integer.parseInt(runtimeString[0]) + Integer.parseInt(runtimeString[1]);
            likedTrailDtoList.add(LikedTrailDto.of(trailsMidLikes.getTrailsId().getId(), trailsMidLikes.getTrailsId().getTrailsImg(), trailsMidLikes.getTrailsId().getLikeNum(),
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

        User exits = userRepository.findByNickName(dto.getNickName());
        if (exits != null && !Objects.equals(user.getNickName(), dto.getNickName())) {
            throw new CustomException(ErrorType.ALREADY_EXIST_USER_NICKNAME);
        }
        // imgURL을 만들어서 S3에 저장 시작
        String imgUrl = "";
        System.out.println(dto.getImgUrl());
        if (dto.getImgUrl() == null) {
            imgUrl = user.getKakaoProfileImg();
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

    public void addLikeList(User user, UserAddLikeListRequestDto dto) {

        if (userRepository.findByKakaoEmailAndDeletedAtIsNull(user.getKakaoEmail()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }

        CustomTrails customTrails = customTrailsRepository.findByIdAndDeletedAtIsNull(dto.getTrailsId()).orElseThrow(
                () -> new CustomException(ErrorType.NOT_FOUND_TRAILS)
        );

        TrailsMidLikes trailsMidLikes = trailsMidLikesRepository.findByUserIdAndTrailsIdAndDeletedAtIsNull(user,customTrails);
        if (trailsMidLikes == null) {
            trailsMidLikes = TrailsMidLikes.of(user, customTrails);
            customTrails.updateLikeNum(1);
            trailsMidLikesRepository.save(trailsMidLikes);
        }else{
            throw new CustomException(ErrorType.ALREADY_EXIST_TRAILS_MID_LIKES);
        }
    }

    public void deleteLikeList(User user, Long trailsId) {
        System.out.println("시작");
        if (userRepository.findByKakaoEmailAndDeletedAtIsNull(user.getKakaoEmail()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }

        CustomTrails customTrails = customTrailsRepository.findByIdAndDeletedAtIsNull(trailsId).orElseThrow(
                () -> new CustomException(ErrorType.NOT_FOUND_TRAILS)
        );

        TrailsMidLikes trailsMidLikes = trailsMidLikesRepository.findByUserIdAndTrailsIdAndDeletedAtIsNull(user,customTrails);
        System.out.println("중간");

        if (trailsMidLikes == null) {
            throw new CustomException(ErrorType.NOT_FOUND_TRAILS_MID_LIKES);
        }else{
            trailsMidLikesRepository.delete(trailsMidLikes);
            customTrails.updateLikeNum(-1);
        }
        System.out.println("끝");

    }

    public void userAddSignUpInfo(User user, UserAddSignUpInfoRequestDto dto){
        User userInfo = userRepository.findByIdAndDeletedAtIsNull(user.getId())
                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_USER));
        User exits = userRepository.findByNickName(dto.getNickName());
        if (exits != null) {
            throw new CustomException(ErrorType.ALREADY_EXIST_USER_NICKNAME);
        }
        userInfo.addUserSignUpInfo(dto.getNickName(), dto.getAddress(), dto.getRequiredTimeStart(), dto.getRequiredTimeEnd());
    }
}
