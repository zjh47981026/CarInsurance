package com.synergisticit.service;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.async.AsyncResponseTransformer;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3AsyncClient;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class S3Service {

    @Value("${aws.s3.bucket.name}")
    private String BUCKET_NAME;

    private String BUCKET_URL;

    @PostConstruct
    public void init() {
        BUCKET_URL = "https://" + BUCKET_NAME + ".s3.us-east-1.amazonaws.com/";
    }

    private final S3AsyncClient s3AsyncClient;

    public S3Service() {
        this.s3AsyncClient = S3AsyncClient.builder().region(Region.US_EAST_1).build();
    }


    public List<CompletableFuture<String>> uploadMultipleFiles(MultipartFile[] files, String username) {
        List<CompletableFuture<String>> futures = new ArrayList<>();

        for (MultipartFile file : files) {
            Random random = new Random();
            int random5DigitNumber = random.nextInt(90000) + 10000;
            try {
                String filename = file.getOriginalFilename();
                String fileKey = random5DigitNumber + "_" +username +"_"+ filename;
                PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                        .bucket(BUCKET_NAME)
                        .key(fileKey)
                        .acl("public-read")
                        .contentType(file.getContentType())
                        .build();
                CompletableFuture<PutObjectResponse> s3ResponseFuture = s3AsyncClient.putObject(putObjectRequest,
                        software.amazon.awssdk.core.async.AsyncRequestBody.fromBytes(file.getBytes()));

                CompletableFuture<String> urlFuture = s3ResponseFuture.thenApply(response -> fileKey);
                futures.add(urlFuture);

            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return futures;
    }

    public CompletableFuture<Void> deleteMultipleFiles(List<String> fileKeys) {
        List<ObjectIdentifier> objectsToDelete = fileKeys.stream()
                .map(key -> ObjectIdentifier.builder().key(key).build())
                .collect(Collectors.toList());

        DeleteObjectsRequest deleteObjectsRequest = DeleteObjectsRequest.builder()
                .bucket(BUCKET_NAME)
                .delete(Delete.builder().objects(objectsToDelete).build())
                .build();

        return s3AsyncClient.deleteObjects(deleteObjectsRequest).thenRun(() -> {});
    }

    public List<CompletableFuture<byte[]>> getMultipleFiles(List<String> fileKeys) {
        List<CompletableFuture<byte[]>> futures = new ArrayList<>();
        for (String fileKey : fileKeys) {
            GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                    .bucket(BUCKET_NAME)
                    .key(fileKey)
                    .build();

            CompletableFuture<byte[]> fileFuture = s3AsyncClient.getObject(
                    getObjectRequest,
                    AsyncResponseTransformer.toBytes()
            ).thenApply(responseBytes -> responseBytes.asByteArray());

            futures.add(fileFuture);
        }
        return futures;
    }

}
