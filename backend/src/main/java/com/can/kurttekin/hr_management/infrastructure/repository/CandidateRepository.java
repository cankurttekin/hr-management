package com.can.kurttekin.hr_management.infrastructure.repository;

import com.can.kurttekin.hr_management.domain.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long> {
}
