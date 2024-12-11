package com.can.kurttekin.hr_management.presentation.rest;

import com.can.kurttekin.hr_management.application.dto.CandidateDto;
import com.can.kurttekin.hr_management.domain.service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidates")
public class CandidateController {

    @Autowired
    private CandidateService candidateService;

    @PostMapping
    public ResponseEntity<CandidateDto> createCandidate(
            @RequestBody CandidateDto candidateDto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(candidateService.createCandidate(candidateDto));
    }

    @GetMapping
    public ResponseEntity<List<CandidateDto>> getAllCandidates() {
        return ResponseEntity
                .ok(candidateService.getAllCandidates());
    }

    @GetMapping
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
