import { http, HttpResponse } from 'msw'
 
export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/profile`, () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      "data": {
          "nickName": "오세방",
          "address": "경상북도 구미시 진미동",
          "requiredTimeStart": 3,
          "requiredTimeEnd": 7,
          "profileImg": "https://ssafys3.s3.ap-northeast-2.amazonaws.com/ssafy/27101%ED%9E%88%ED%9E%88.png",
          "profileEmail": "osy9536@kakao.com",
          "likedTrailDtos": [
              {
                  "likedTrailsId": 21,
                  "trailsId": 3,
                  "trailsImgUrl": "https://ssafys3.s3.ap-northeast-2.amazonaws.com/static/16695%EB%A1%A4+%EB%B0%B0%EA%B2%BD2.jpg",
                  "likedNum": 2,
                  "distance": 13.2,
                  "runtime": 26,
                  "address": "경상북도구미시진미동",
                  "liked": true
              }
          ]
      },
      "msg": "프로필 데이터 불러오기 성공"
  })
  }),
    // Intercept "GET https://example.com/user" requests...
    http.get(`${import.meta.env.VITE_API_BASE_URL}/api/main`, () => {
      // ...and respond to them using this JSON response.
      return HttpResponse.json({
        "data": {
          "profileImg": "http://k.kakaocdn.net/dn/Cku4m/btsF3dRFEgk/W7UZyAyKcFs0IuTgCK1yzk/img_640x640.jpg",
          "nickName": "안유나",
          "accumulatedWalkingTime": "0:05:20",
          "accumulatedDistance": 10.01,
          "accumulatedFootstep": 0,
          "aroundTrailsRecommend": [
            {
              "trailsId": 7,
              "trailsImg": "",
              "runtime": 102,
              "distance": 1.2,
              "likeNum": 18,
              "address": "달서구 장기동",
              "like": false
            },
            {
              "trailsId": 5,
              "trailsImg": "",
              "runtime": 30,
              "distance": 1.2,
              "likeNum": 10,
              "address": "수성구 범어동",
              "like": false
            },
            {
              "trailsId": 6,
              "trailsImg": "",
              "runtime": 480,
              "distance": 1.2,
              "likeNum": 8,
              "address": "달서구 장기동",
              "like": false
            }
          ],
          "safeTrailsRecommend": [
            {
              "trailsId": 5,
              "trailsImg": "",
              "runtime": 30,
              "distance": 1.2,
              "likeNum": 10,
              "address": "수성구 범어동",
              "like": false
            },
            {
              "trailsId": 7,
              "trailsImg": "",
              "runtime": 102,
              "distance": 1.2,
              "likeNum": 18,
              "address": "달서구 장기동",
              "like": false
            },
            {
              "trailsId": 6,
              "trailsImg": "",
              "runtime": 480,
              "distance": 1.2,
              "likeNum": 8,
              "address": "달서구 장기동",
              "like": false
            },
            {
              "trailsId": 4,
              "trailsImg": "",
              "runtime": 60,
              "distance": 1.2,
              "likeNum": -3,
              "address": "수성구 만촌동",
              "like": false
            }
          ]
        },
        "msg": "메인 페이지 정보 찾기 성공"
      })
    }),
]