package com.can.kurttekin.hr_management.application.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    public String storeFile(MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename(); // added uuid prefix to prevent same file name conflicts
        Path targetPath = Paths.get(uploadDir).toAbsolutePath().normalize();

        if (!Files.exists(targetPath)) {
            Files.createDirectories(targetPath);
        }

        Path filePath = targetPath.resolve(fileName);
        file.transferTo(filePath.toFile());

        return fileName;
    }
}
