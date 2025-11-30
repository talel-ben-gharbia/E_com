package com.isetr.e_commerce.service;

import com.isetr.e_commerce.entity.User;

public interface AuthService {
    User register(User user);
    String login(String email, String password);
}