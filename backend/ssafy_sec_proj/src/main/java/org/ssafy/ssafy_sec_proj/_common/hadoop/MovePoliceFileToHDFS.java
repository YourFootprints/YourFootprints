package org.ssafy.ssafy_sec_proj._common.hadoop;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;

import java.io.IOException;

public class MovePoliceFileToHDFS {
    public static void main(String[] args) throws IOException {
        // HDFS에 접속하기 위한 Configuration 객체 생성
        Configuration configuration = new Configuration();
        configuration.set("fs.defaultFS", "hdfs://j10d207a.p.ssafy.io:9000");

        FileSystem fs = FileSystem.get(configuration);

        String localFilePath = "/home/ubuntu/hadoop/src/police.csv";
        String hdfsFilePath = "/home/ubuntu/src/data/police.csv";

        Path localPath = new Path(localFilePath);
        Path hdfsPath = new Path(hdfsFilePath);
        fs.copyFromLocalFile(localPath, hdfsPath);

        fs.close();
    }
}
