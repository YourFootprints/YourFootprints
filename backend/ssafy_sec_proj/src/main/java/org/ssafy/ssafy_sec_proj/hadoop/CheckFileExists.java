package org.ssafy.ssafy_sec_proj.hadoop;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;

public class CheckFileExists {
    public static void main(String[] args) throws Exception {
        // Hadoop 설정 초기화
        Configuration configuration = new Configuration();
        // 여기에 HDFS의 fs.defaultFS 값을 설정합니다. 예: hdfs://localhost:9000
        configuration.set("fs.defaultFS", "hdfs://j10d207a.p.ssafy.io:9000");
        FileSystem fs = FileSystem.get(configuration);

        // 확인하고 싶은 파일의 HDFS 경로
        Path filePath = new Path("/home/ubuntu/src/data/cafe.csv");

        // 파일 존재 여부 확인, true로 반환한다.
        if (fs.exists(filePath)) {
            System.out.println("file exist: " + filePath);
        } else {
            System.out.println("file not exist: " + filePath);
        }

        // FileSystem 리소스 해제
        fs.close();
    }
}