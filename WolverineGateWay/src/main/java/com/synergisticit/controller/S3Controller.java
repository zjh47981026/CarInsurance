package com.synergisticit.controller;

import com.synergisticit.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@RestController
public class S3Controller {

    @Autowired
    S3Service service;

    @RequestMapping(value ="/upload/{username}", method = RequestMethod.POST)
    public ResponseEntity<List<String>> uploadMultipleFiles(@RequestParam(value = "files", required = false) MultipartFile[] files, @PathVariable  String username) {

        if (files == null || files.length == 0) {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.OK);
        }

        try {

            List<CompletableFuture<String>> futures = service.uploadMultipleFiles(files, username);

            List<String> urls = futures.stream()
                    .map(CompletableFuture::join)
                    .collect(Collectors.toList());

            return new ResponseEntity<>(urls, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
