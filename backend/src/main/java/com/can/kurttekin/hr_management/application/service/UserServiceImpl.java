package com.can.kurttekin.hr_management.application.service;

import com.can.kurttekin.hr_management.application.request.RegistrationRequest;
import com.can.kurttekin.hr_management.domain.model.User;
import com.can.kurttekin.hr_management.domain.service.UserService;
import com.can.kurttekin.hr_management.infrastructure.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public void registerUser(RegistrationRequest userRequest) {
        // Check Recruiter username and email
        if (userRepository.existsByUsername(userRequest.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(userRequest.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // Create and save new Recruiter User
        User user = new User();
        user.setUsername(userRequest.getUsername());
        user.setEmail(userRequest.getEmail());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        userRepository.save(user);
    }

    @Override
    public Optional<User> loadUserById(Long userId) {
        return userRepository.findById(userId);
    }

    @Override
    public Optional<User> loadUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }


}

