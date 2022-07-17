FROM maven:3.8.6-openjdk-11-slim AS build
RUN mkdir -p /workspace

WORKDIR /workspace
COPY pom.xml /workspace
COPY src /workspace/src
COPY config.yml /workspace
RUN mvn -f pom.xml clean package

FROM openjdk:11-jdk-slim
COPY --from=build /workspace/target/*.jar app.jar
COPY --from=build /workspace/config.yml config.yml
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar", "server", "config.yml"]