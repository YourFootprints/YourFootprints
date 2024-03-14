package org.ssafy.ssafy_sec_proj.users.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.ssafy.ssafy_sec_proj._common.exception.CustomException;
import org.ssafy.ssafy_sec_proj._common.exception.ErrorType;
import org.ssafy.ssafy_sec_proj._common.infra.oauth.entity.KakaoProfile;
import org.ssafy.ssafy_sec_proj._common.infra.oauth.entity.OauthToken;
import org.ssafy.ssafy_sec_proj._common.jwt.JwtUtil;
import org.ssafy.ssafy_sec_proj.users.entity.User;
import org.ssafy.ssafy_sec_proj.users.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UserSignupService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @Value("${kakao.clientId}")
    String clientId;

    @Value("${kakao.secret}")
    String clientSecret;

    public OauthToken getAccessToken(String code, String redirectUri) {
        return requestAccessToken(code, redirectUri);
    }

    private OauthToken requestAccessToken(String code, String redirectUri) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("redirect_uri", redirectUri);
        params.add("code", code);
        params.add("client_secret", clientSecret);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, headers);

        ResponseEntity<String> responseEntity = new RestTemplate().exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                requestEntity,
                String.class
        );

        try {
            ObjectMapper objectMapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            return objectMapper.readValue(responseEntity.getBody(), OauthToken.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<String> SaveUserAndGetToken(String token, HttpServletResponse response) {

        //(1)
        KakaoProfile profile = findProfile(token);

        //(2)
        User user = userRepository.findByKakaoEmailAndDeletedAtIsNull(profile.getKakao_account().getEmail()).orElse(null);

        System.out.println("카카오 이메일 : " + profile.getKakao_account().getProfile().getProfile_image_url());

        boolean isUserNull = false;

        //(3)
        if (user == null) {
            Long kakaoUuid = profile.getId();
            String gender = profile.getKakao_account().getGender();
            String ageRange = profile.getKakao_account().getAge_range();
            String profileImgUrl = profile.getKakao_account().getProfile().getProfile_image_url();
            String userName = profile.getProperties().getNickname();
            String kakaoEmail = profile.getKakao_account().getEmail();
            String nickName = profile.getKakao_account().getProfile().getNickname();
            String visitedLocation = ""; // 방문한 장소 정보를 얻어와야 함
            int preferDurationS = 0; // 선호하는 여행 지속 시간을 얻어와야 함
            int preferDurationE = 0; // 선호하는 여행 지속 시간을 얻어와야 함
            String userRole = "ROLE_USER"; // 기본 사용자 역할 설정

            user = User.of(kakaoUuid, gender, ageRange, profileImgUrl, userName, kakaoEmail, nickName, visitedLocation, preferDurationS, preferDurationE, userRole);

            userRepository.save(user);
            isUserNull = true;
        }
        String jwtToken = jwtUtil.createToken(user.getKakaoEmail());
        response.addHeader("Authorization", jwtToken);

        List<String> ans = new ArrayList<>();
        ans.add(jwtToken);
        ans.add(String.valueOf(isUserNull));
        return ans;
    }

    public User getUser(User nowUser) {

//        Long userCode = (Long) nowUser.getAttribute("userCode");
//
//        User user = userRepository.findById(userCode).orElseThrow(
//                ()->new CustomException(ErrorType.NOT_FOUND_USER)
//        );

        return nowUser;
    }


    //(1-1)
    public KakaoProfile findProfile(String token) {

        //(1-2)
        RestTemplate rt = new RestTemplate();

        System.out.println("token : " + token);

        //(1-3)
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token); //(1-4)
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        //(1-5)
        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest =
                new HttpEntity<>(headers);

        //(1-6)
        // Http 요청 (POST 방식) 후, response 변수에 응답을 받음
        ResponseEntity<String> kakaoProfileResponse = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );

        //(1-7)
        ObjectMapper objectMapper = new ObjectMapper();
        KakaoProfile kakaoProfile = null;
        try {
            kakaoProfile = objectMapper.readValue(kakaoProfileResponse.getBody(), KakaoProfile.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return kakaoProfile;
    }

   /* public JsonNode Logout(String autorize_code){

        final String RequestUrl = "https://kapi.kakao.com/v1/user/logout";

        final HttpClient client = HttpClientBuilder.create().build();

        final HttpPost post =new HttpPost(RequestUrl);

        post.addHeader("Authorization","Bearer" + autorize_code);

        JsonNode returnNode =null;

        try{
            final HttpResponse response = client.execute(post);

             ObjectMapper mapper = new ObjectMapper();

             returnNode = mapper.readTree(response.getEntity().getContent());
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch(ClientProtocolException e){
            e.printStackTrace();
        } catch(IOException e){
            e.printStackTrace();
        } finally{

        }
        return returnNode;}*/

    public User validateUserByEmail(String email) {

        return userRepository.findByKakaoEmailAndDeletedAtIsNull(email)
                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_USER));
    }
}
