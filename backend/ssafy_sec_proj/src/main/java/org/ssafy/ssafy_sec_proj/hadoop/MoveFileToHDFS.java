package org.ssafy.ssafy_sec_proj.hadoop;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;

import java.io.IOException;

public class MoveFileToHDFS {
    public static void main(String[] args) throws IOException {
        Configuration configuration = new Configuration();
        configuration.set("fs.defaultFS", "hdfs://j10d207a.p.ssafy.io:9000");
        FileSystem fs = FileSystem.get(configuration);

        // 로컬 파일 시스템의 파일 경로
        String localFilePath = "/home/ubuntu/hadoop/src/cafe.csv";
        // HDFS로 옮기기 위한 목적지 경로
        String hdfsFilePath = "/home/ubuntu/src/data/cafe.csv";

        // 로컬 파일을 HDFS로 복사
        Path localPath = new Path(localFilePath);
        Path hdfsPath = new Path(hdfsFilePath);
        fs.copyFromLocalFile(localPath, hdfsPath);

        fs.close();
    }
}