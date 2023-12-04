package com.synergisticit.controller;

import com.synergisticit.domain.Authority;
import com.synergisticit.service.AuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AuthorityController {
    @Autowired
    AuthorityService authorityService;

    @GetMapping("/getAuthorities/{username}")
    public List<Authority> getAuthorities(@PathVariable String username) {
        return authorityService.getAuthorities(username);
    }
}
