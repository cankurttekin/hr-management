package com.can.kurttekin.hr_management.presentation.rest;

import com.can.kurttekin.hr_management.application.dto.CandidateDto;
import com.can.kurttekin.hr_management.domain.service.CandidateService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/candidates")
public class CandidateController {

    @Autowired
    private CandidateService candidateService;

    @PostMapping
    public ResponseEntity<CandidateDto> createCandidate(
            @RequestParam("candidate") String candidateJson,
            @RequestParam(value = "cvFile") MultipartFile cvFile) {


        try {
            // Convert the JSON string into a CandidateDto
            ObjectMapper objectMapper = new ObjectMapper();
            CandidateDto candidateDto = objectMapper.readValue(candidateJson, CandidateDto.class);

            // Call the service with the candidateDto and cvFile
            CandidateDto savedCandidate = candidateService.createCandidate(candidateDto, cvFile);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedCandidate);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }


        // CandidateDto savedCandidate = candidateService.createCandidate(candidateDto, cvFile);
        //return ResponseEntity.status(HttpStatus.CREATED).body(savedCandidate);
    }

    @GetMapping
    public ResponseEntity<List<CandidateDto>> getAllCandidates() {
        return ResponseEntity
                .ok(candidateService.getAllCandidates());
    }

    @GetMapping("/filter")
    public ResponseEntity<List<CandidateDto>> getCandidatesByCriteria(
            @RequestParam(required = false) String position,
            @RequestParam(required = false) String militaryStatus,
            @RequestParam(required = false) String noticePeriod) {
        return ResponseEntity.ok(candidateService.getCandidatesByCriteria(position, militaryStatus, noticePeriod));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CandidateDto> getCandidateById(@PathVariable Long id) {
        return ResponseEntity
                .ok(candidateService.getCandidateById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CandidateDto> updateCandidate(
            @PathVariable Long id,
            @RequestBody CandidateDto candidateDto) {
        return ResponseEntity.ok(candidateService.updateCandidate(id, candidateDto));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCandidate(@PathVariable Long id) {
        candidateService.deleteCandidate(id);
        return ResponseEntity.noContent().build();
    }
}
