package com.synergisticit.service;

import com.synergisticit.domain.User;
import com.synergisticit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User save(User u) {
        User user = userRepository.save(u);
        return user;
    }

    @Override
    public User findByUserId(long uId) {
        Optional<User> u = userRepository.findById(uId);
        if(u.isPresent()) {
            return u.get();
        }else
            return null;
    }

    @Override
    public void deleteUserById(long uId) {
        userRepository.deleteById(uId);
    }

    @Override
    public User findByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }
}
