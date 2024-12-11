package com.can.kurttekin.hr_management.application.dto;

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
    private String militaryStatus;
    private String noticePeriod;
    private String phone;
    private String email;
    private String cv;

    // REFACTOR: @Builder
}
