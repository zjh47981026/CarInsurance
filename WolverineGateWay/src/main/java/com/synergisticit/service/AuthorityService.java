package com.synergisticit.service;

import com.synergisticit.domain.Authority;
import com.synergisticit.repository.AuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorityService {

    @Autowired
    AuthorityRepository authorityRepository;

    public List<Authority> getAuthorities (String username) {
        return authorityRepository.findAllByUsername(username);
    }
}
