package com.ssafy.farmyo.common.s3;

import com.ssafy.farmyo.common.utils.s3fileutils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import org.springframework.mock.web.MockMultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Service
public class AwsS3Service {

    private final S3Client s3Client;

    @Value("${spring.cloud.aws.s3.bucket}")
    private String bucketName;

    // 파일 S3로 업로드
    public String uploadFile(MultipartFile multipartFile) {

        // 빈 파일이면 빈 문자열 리턴
        if(multipartFile.isEmpty()) {
            log.info("image is null");
            return "";
        }

        // S3에 저장할 파일이름으로 변환
        String fileName = s3fileutils.buildFileName(multipartFile.getOriginalFilename());

        // S3에 파일 저장
        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .contentType(multipartFile.getContentType())
                    .contentLength(multipartFile.getSize())
                    .key(fileName)
                    .build();
            RequestBody requestBody = RequestBody.fromBytes(multipartFile.getBytes());
            s3Client.putObject(putObjectRequest, requestBody);
        } catch (IOException e) {
            log.error("cannot upload file",e);
            throw new RuntimeException(e);
        }

        // 저장한 파일의 URL 가져오기
        GetUrlRequest getUrlRequest = GetUrlRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .build();
        return s3Client.utilities().getUrl(getUrlRequest).toString();
    }

    // 다운로드 테스트
    public String downloadFile(String fileName) {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .build();

        log.error("getObjectRequest : {}", getObjectRequest);
        try (ResponseInputStream<GetObjectResponse> s3Object = s3Client.getObject(getObjectRequest)) {
            log.error("s3Object : {}", s3Object);
            // ResponseInputStream의 데이터를 바이트 배열로 변환
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int len;
            while ((len = s3Object.read(buffer)) > 0) {
                baos.write(buffer, 0, len);
            }
            byte[] fileContent = baos.toByteArray();

            // MockMultipartFile 객체 생성
            String fileName2 = "download_" + fileName;
            String contentType = s3Object.response().contentType();
            log.error("content type : {}", contentType);
            MockMultipartFile multipartFile = new MockMultipartFile("file", fileName2, contentType, fileContent);

            return uploadFile(multipartFile);

        } catch (IOException e) {
            log.error("Error downloading file: " + fileName, e);
            throw new RuntimeException(e);
        }
    }

    //삭제 테스트

    //url에서 파일 이름 추출
    private String extractFileNameFromUrl(String fileUrl) {
        int lastIndexOfSlash = fileUrl.lastIndexOf("/");
        if (lastIndexOfSlash >= 0 && lastIndexOfSlash < fileUrl.length() - 1) {
            return fileUrl.substring(lastIndexOfSlash + 1);
        } else {
            throw new IllegalArgumentException("Invalid file URL format");
        }
    }

    public void deleteFileByUrl(String fileUrl) {
        String fileName = extractFileNameFromUrl(fileUrl);

        try {
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .build();

            s3Client.deleteObject(deleteObjectRequest);
            log.info("File deleted successfully from URL: {}", fileUrl);
        } catch (Exception e) {
            log.error("Error deleting file from URL: " + fileUrl, e);
            throw new RuntimeException("Error deleting file from S3", e);
        }
    }
}