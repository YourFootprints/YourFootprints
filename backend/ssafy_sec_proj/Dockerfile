FROM openjdk:17-jdk-alpine
VOLUME /tmp 
ADD ./build/libs/ssafy_sec_proj-0.0.1-SNAPSHOT.jar app.jar
ENV JAVA_OPTS=""
ENTRYPOINT ["java", "-jar", "/app.jar"]