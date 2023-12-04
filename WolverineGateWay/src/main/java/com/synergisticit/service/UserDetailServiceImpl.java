package com.synergisticit.service;

import com.synergisticit.domain.Authority;
import com.synergisticit.domain.User;
import com.synergisticit.domain.UserRole;
import com.synergisticit.repository.AuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
    @Autowired
    UserService userService;

    @Autowired
    AuthorityRepository authorityRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.findByUserName(username);
        if(user == null) {
            throw new UsernameNotFoundException(username);
        }
        Set<GrantedAuthority> ga = new HashSet<>();
        Authority auth = authorityRepository.findAuthorityByUsername(user.getUserName());
        /*
        for (UserRole role : roles) {
            System.out.println("role.getRoleName()" + role.name());
            ga.add(new SimpleGrantedAuthority(role.name()));
        } */
        ga.add(new SimpleGrantedAuthority(auth.getAuthority()));
        return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(), ga);
    }

}
