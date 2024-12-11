package com.can.kurttekin.hr_management.application.service;

import com.can.kurttekin.hr_management.application.dto.CandidateDto;
import com.can.kurttekin.hr_management.domain.model.Candidate;
import com.can.kurttekin.hr_management.domain.service.CandidateService;
import com.can.kurttekin.hr_management.infrastructure.repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for managing Candidate operations.
 * Acts as an intermediary between the controller and repository layers.
 */
@Service
public class CandidateServiceImpl implements CandidateService {

    /**
     * Injects the CandidateRepository dependency.
     */
    @Autowired
    private CandidateRepository candidateRepository;

    /**
     * Creates candidate from given candidate dto.
     *
     * @param candidateDto DTO of the candidate to create.
     * @return Saved candidate.
     */
    @Transactional
    @Override
    public CandidateDto createCandidate(CandidateDto candidateDto) {
        Candidate candidate = mapToEntity(candidateDto);
        assert candidate != null;
        Candidate savedCandidate = candidateRepository.save(candidate);
        return mapToDto(savedCandidate);
    }

    /**
     * Retrieves all candidates from the database.
     *
     * @return A list of all candidates.
     * @throws RuntimeException if there are no candidates.
     */
    @Transactional(readOnly = true)
    @Override
    public List<CandidateDto> getAllCandidates() {
        List<Candidate> candidates = candidateRepository.findAll();
        //if (candidates.isEmpty()) {
        //    throw new RuntimeException("No candidates found.");
        //}

        return candidates.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    /**
     * Retrieves a candidate by their unique ID.
     *
     * @param id The ID of the candidate to retrieve.
     * @return A CandidateDTO if found, or empty otherwise.
     * @throws IllegalArgumentException if the candidate with the given ID does not exist.
     */
    @Transactional(readOnly = true)
    @Override
    public CandidateDto getCandidateById(Long id) {
        Candidate candidate = candidateRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Candidate not found for ID: " + id)); // REFACTOR: CUSTOM EXCEPTION

        return mapToDto(candidate);
    }

    /**
     * Updates a candidate by their unique ID and DTO.
     *
     * @param id The ID of the candidate to update.
     * @param candidateDto DTO of the candidate to update.
     * @return Updated CandidateDTO.
     * @throws IllegalArgumentException if the candidate with the given ID does not exist.
     */
    @Override
    public CandidateDto updateCandidate(Long id,
                                        CandidateDto candidateDto) {
        Candidate existingCandidate = candidateRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Candidate not found for ID: " + id)); // REFACTOR: CUSTOM EXCEPTION

        // Set updated attributes of candidate
        existingCandidate.setFirstName(candidateDto.getFirstName());
        existingCandidate.setLastName(candidateDto.getLastName());
        existingCandidate.setPosition(candidateDto.getPosition());
        existingCandidate.setMilitaryStatus(candidateDto.getMilitaryStatus());
        existingCandidate.setNoticePeriod(candidateDto.getNoticePeriod());
        existingCandidate.setPhone(candidateDto.getPhone());
        existingCandidate.setEmail(candidateDto.getEmail());
        existingCandidate.setCv(candidateDto.getCv());

        // Save and return the updated candidate
        Candidate updatedCandidate = candidateRepository.save(existingCandidate);
        return mapToDto(updatedCandidate);
    }

    /**
     * Deletes a candidate by their unique ID.
     *
     * @param id The ID of the candidate to delete.
     * @throws IllegalArgumentException if the candidate with the given ID does not exist.
     */
    @Transactional
    @Override
    public void deleteCandidate(Long id) {
        // Check if the candidate exists
        candidateRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Candidate not found for ID: " + id));

        // If found, proceed with deletion
        candidateRepository.deleteById(id);
    }


    // DTO MAPPINGS
    private CandidateDto mapToDto(Candidate candidate) {
        CandidateDto candidateDto = new CandidateDto();
        candidateDto.setId(candidate.getId());
        candidateDto.setFirstName(candidate.getFirstName());
        candidateDto.setLastName(candidate.getLastName());
        candidateDto.setPosition(candidate.getPosition());
        candidateDto.setMilitaryStatus(candidate.getMilitaryStatus());
        candidateDto.setNoticePeriod(candidate.getNoticePeriod());
        candidateDto.setPhone(candidate.getPhone());
        candidateDto.setEmail(candidate.getEmail());
        candidateDto.setCv(candidate.getCv());
        return candidateDto;
    }

    private Candidate mapToEntity(CandidateDto candidateDto) {
        Candidate candidate = new Candidate();
        candidate.setFirstName(candidateDto.getFirstName());
        candidate.setLastName(candidateDto.getLastName());
        candidate.setPosition(candidateDto.getPosition());
        candidate.setMilitaryStatus(candidateDto.getMilitaryStatus());
        candidate.setNoticePeriod(candidateDto.getNoticePeriod());
        candidate.setPhone(candidateDto.getPhone());
        candidate.setEmail(candidateDto.getEmail());
        candidate.setCv(candidateDto.getCv());
        return candidate;
    }
}
