package com.can.kurttekin.hr_management.application.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegistrationRequest {
    private String username;
    private String email;
    private String password;
}
