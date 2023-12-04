package com.synergisticit.controller;


import com.synergisticit.domain.Token;
import com.synergisticit.domain.User;
import com.synergisticit.domain.UserRole;
import com.synergisticit.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {
    private AuthenticationService authenticationService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/authenticate/admin")
    public Token authenticateAdmin(@RequestBody User user) {
        return authenticationService.authenticate(user, UserRole.ROLE_ADMIN);
    }

    @PostMapping("/authenticate/user")
    public Token authenticateUser(@RequestBody User user) {
        return authenticationService.authenticate(user, UserRole.ROLE_USER);
    }
}

