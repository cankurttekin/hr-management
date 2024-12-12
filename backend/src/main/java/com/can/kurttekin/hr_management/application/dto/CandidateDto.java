package com.can.kurttekin.hr_management.application.dto;

import com.can.kurttekin.hr_management.domain.model.MilitaryStatus;
import lombok.*;

@Data
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CandidateDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String position;
    private MilitaryStatus militaryStatus;
    private String noticePeriod;
    private String phone;
    private String email;
    private String cv;

    // REFACTOR: @Builder
}
