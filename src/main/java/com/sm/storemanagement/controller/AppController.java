package com.sm.storemanagement.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppController {
    @GetMapping("/api/hello")
    public String test() {
        return "Hello, world";
    }
}
