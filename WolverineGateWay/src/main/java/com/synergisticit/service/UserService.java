package com.synergisticit.service;


import com.synergisticit.domain.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    public List<User> findAll();
    public User save(User u);
    public void deleteUserById(long uId);
    public User findByUserId(long uId);
    public User findByUserName(String userName);
}
