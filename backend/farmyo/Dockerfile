FROM openjdk:17-jdk-alpine
# FROM : 이미지 레이어의 최상단, alpine리눅스에 jdk 17을 사용한단 의미

WORKDIR /app
# WORKDIR : 스프링 부트 컨테이너 OS내에 어떤 디렉토리에서 jar을 실행 할 것인지

ARG JAR_FILE=build/libs/farmyo-0.0.1-SNAPSHOT.jar
# ARG : 변수지정, 변수에 적혀진 의미는 빌드 결과물 위치

COPY ${JAR_FILE} test.jar
# Auto Exctraction으로 압축된 파일을 해제하여 test.jar에 그 내용을 복사, 결국 스프링부트를 실행하는 컨테이너 내에는 test.jar가 있게 됨

ENTRYPOINT ["java", "-jar","test.jar","--encryptor.key=${JASYPT_KEY}"]
# ENTRYPOINT : 해당 컨테이너 시작할때 무조건 실행할 명령어 지정