package com.can.kurttekin.hr_management.domain.service;

import com.can.kurttekin.hr_management.application.request.RegistrationRequest;
import com.can.kurttekin.hr_management.domain.model.User;

import java.util.Optional;

public interface UserService {
    void registerUser(RegistrationRequest registrationRequest);
    Optional<User> findUserById(Long userId);
    Optional<User> findUserByUsername(String username);
}
