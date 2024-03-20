package org.ssafy.ssafy_sec_proj._common.hadoop;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class ReadCsvFromHDFS {
    public static void main(String[] args) {
        Configuration configuration = new Configuration();
        configuration.set("fs.defaultFS", "hdfs://j10d207a.p.ssafy.io:9000");
        Path filePath = new Path("/home/ubuntu/src/data/cafe.csv");

        try {
            FileSystem fs = FileSystem.get(configuration);
            FSDataInputStream inputStream = fs.open(filePath);
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream, "EUC-KR"));

            String line;
            int count = 0;
            // 파일에서 5줄을 읽습니다.
            while ((line = bufferedReader.readLine()) != null && count < 5) {
                System.out.println(line);
                count++;
            }

            bufferedReader.close();
            fs.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
