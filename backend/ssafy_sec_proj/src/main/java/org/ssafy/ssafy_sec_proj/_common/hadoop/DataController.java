package org.ssafy.ssafy_sec_proj._common.hadoop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DataController {

    private final DataService dataService;

    @Autowired
    public DataController(DataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping("/api/data/{category}/{latitude}/{longitude}")
    public ResponseEntity<String> fetchData(@PathVariable String category, @PathVariable double latitude, @PathVariable double longitude) {
        dataService.fetchData(category, latitude, longitude);
        return ResponseEntity.ok("Data fetched successfully.");
    }
}

