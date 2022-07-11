package com.sm.storemanagement.controller;

import com.sm.storemanagement.mapper.UserMapper;
import com.sm.storemanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AppController {

    @Autowired
    private UserService userService;


    @RequestMapping(value = "/api/joinMember", method = {RequestMethod.POST})
    public Map<String, Object> join(@RequestParam Map<String, Object> requestParam) {
        Map<String ,Object> resultMap = new HashMap<>();

        String password = requestParam.get("password").toString();

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        requestParam.put("password", passwordEncoder.encode(password));

        if (userService.join(requestParam)) {
           resultMap.put("resultCode", "S0001");
        } else {
          resultMap.put("resultCOde", "E0001");
        }

        return resultMap;
    }
}
