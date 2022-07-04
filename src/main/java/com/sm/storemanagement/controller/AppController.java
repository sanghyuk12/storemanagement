package com.sm.storemanagement.controller;

import com.sm.storemanagement.dto.UserDTO;
import com.sm.storemanagement.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AppController {
    @Autowired
    private UserMapper userMapper;

    @GetMapping("/api/hello")
    public List<UserDTO> test() {
        return userMapper.selectUser();
    }
}
