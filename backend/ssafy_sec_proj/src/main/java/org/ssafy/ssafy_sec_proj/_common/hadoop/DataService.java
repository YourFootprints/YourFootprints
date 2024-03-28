package org.ssafy.ssafy_sec_proj._common.hadoop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class DataService {

    private final RestTemplate restTemplate;

    @Autowired
    public DataService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String fetchData(String category, double latitude, double longitude) {
        // URL 동적 구성
        String url = String.format("http://j10d207a.p.ssafy.io:8000/data/%s/%f /%f", category, latitude, longitude);

        // GET 요청 보내기
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        System.out.println("Response Body from FastAPI: " + response.getBody());
        // 응답 본문 반환
        return response.getBody();
    }
}
