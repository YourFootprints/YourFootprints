package org.ssafy.ssafy_sec_proj.hadoop;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.fs.FileStatus;


public class ListFilesInHDFS {
    public static void main(String[] args) {
        Configuration configuration = new Configuration();
        // HDFS의 fs.defaultFS 값을 설정합니다. 예: hdfs://localhost:9000
        configuration.set("fs.defaultFS", "hdfs://j10d207a.p.ssafy.io:9000");

        try {
            // FileSystem 객체를 얻어옵니다.
            FileSystem fs = FileSystem.get(configuration);

            // 확인하고 싶은 디렉토리의 HDFS 경로
            Path path = new Path("/home/ubuntu/src/data");

            // 디렉토리 내의 파일과 디렉토리 목록을 가져옵니다.
            FileStatus[] status = fs.listStatus(path);

            // 결과를 출력합니다.
            System.out.println("Files in " + path + ":");
            for (FileStatus fileStatus : status) {
                System.out.println(fileStatus.getPath().getName());
            }

            // FileSystem 리소스 해제
            fs.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
