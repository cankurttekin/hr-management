package com.can.kurttekin.hr_management.domain.service;

import com.can.kurttekin.hr_management.application.dto.CandidateDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CandidateService {
    CandidateDto createCandidate(CandidateDto candidateDto, MultipartFile cvFile);
    List<CandidateDto> getAllCandidates();
    CandidateDto getCandidateById(Long id);
    CandidateDto updateCandidate(Long id, CandidateDto candidateDto);
    void deleteCandidate(Long id);

    List<CandidateDto> getCandidatesByCriteria(String position, String militaryStatus, String noticePeriod);
}
