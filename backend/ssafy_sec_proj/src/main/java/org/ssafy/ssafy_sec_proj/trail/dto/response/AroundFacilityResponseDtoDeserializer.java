//package org.ssafy.ssafy_sec_proj.trail.dto.response;
//
//import com.fasterxml.jackson.core.JsonParser;
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.DeserializationContext;
//import com.fasterxml.jackson.databind.JsonDeserializer;
//import com.fasterxml.jackson.databind.JsonNode;
//
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//public class AroundFacilityResponseDtoDeserializer extends JsonDeserializer<Map<String, List<AroundFacilityResponseDto>>> {
//
//    @Override
//    public Map<String, List<AroundFacilityResponseDto>> deserialize(JsonParser jp, DeserializationContext ctxt)
//            throws IOException, JsonProcessingException {
//        JsonNode rootNode = jp.getCodec().readTree(jp);
//        Map<String, List<AroundFacilityResponseDto>> categoryToFacilitiesMap = new HashMap<>();
//
//        // 기존의 categories 리스트를 사용하여 각 카테고리별로 처리
//        String[] categories = {"toilet", "police", "restaurant", "cctv", "cafe", "convenience"};
//
//        for (String category : categories) {
//            List<AroundFacilityResponseDto> facilitiesList = new ArrayList<>();
//            JsonNode categoryNode = rootNode.get(category);
//            if (categoryNode != null && categoryNode.isArray()) {
//                for (JsonNode facilityNode : categoryNode) {
//                    String source = category; // category itself acts as the source
//                    String address = facilityNode.has("도로명전체주소") ? facilityNode.get("도로명전체주소").asText()
//                            : facilityNode.has("소재지도로명주소") ? facilityNode.get("소재지도로명주소").asText()
//                            : facilityNode.has("주소") ? facilityNode.get("주소").asText()
//                            : facilityNode.has("address") ? facilityNode.get("address").asText() : null;
//                    String place = facilityNode.has("관서명") ? facilityNode.get("관서명").asText() + " " + facilityNode.get("구분").asText()
//                            : facilityNode.has("관리기관명") ? facilityNode.get("관리기관명").asText()
//                            : facilityNode.has("사업장명") ? facilityNode.get("사업장명").asText()
//                            : facilityNode.has("place") ? facilityNode.get("place").asText() : null;
//                    double latitude = facilityNode.has("lat") ? facilityNode.get("lat").asDouble() : 0.0;
//                    double longitude = facilityNode.has("log") ? facilityNode.get("log").asDouble() : 0.0;
//                    String phone = facilityNode.has("소재지전화") ? facilityNode.get("소재지전화").asText()
//                            : facilityNode.has("관리기관전화번호") ? facilityNode.get("관리기관전화번호").asText() : null;
//                    String distribution = facilityNode.has("설치목적구분") ? facilityNode.get("설치목적구분").asText()
//                            : facilityNode.has("업태구분명") ? facilityNode.get("업태구분명").asText() : null;
//
//                    facilitiesList.add(AroundFacilityResponseDto.of(address, place, latitude, longitude, source, phone, distribution));
//                }
//            }
//            categoryToFacilitiesMap.put(category, facilitiesList);
//        }
//
//        return categoryToFacilitiesMap;
//    }
//}
