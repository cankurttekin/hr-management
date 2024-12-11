package com.can.kurttekin.hr_management.infrastructure.repository;

import com.can.kurttekin.hr_management.domain.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long> {

    @Query("SELECT c FROM Candidate c WHERE " +
            "(:position IS NULL OR c.position = :position) AND " +
            "(:militaryStatus IS NULL OR c.militaryStatus = :militaryStatus) AND " +
            "(:noticePeriod IS NULL OR c.noticePeriod = :noticePeriod)")
    List<Candidate> findByCriteria(@Param("position") String position,
                                   @Param("militaryStatus") String militaryStatus,
                                   @Param("noticePeriod") String noticePeriod);

}
