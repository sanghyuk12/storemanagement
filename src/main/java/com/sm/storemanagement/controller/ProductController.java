package com.sm.storemanagement.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
public class ProductController {

    @RequestMapping(value = "/api/selectProduct", method = {RequestMethod.POST})
    public ArrayList<Map<String, Object>> selectProduct(@RequestParam Map<String, Object> paramMap) {
        ArrayList<Map<String, Object>> resultMap = new ArrayList<>();
        Map<String, Object> responseMap = new HashMap<>();

        responseMap.put("productNm", "제품명");
        responseMap.put("division", "재료");
        responseMap.put("division1", "1개");
        responseMap.put("price", "10000");

        resultMap.add(responseMap);
        resultMap.add(responseMap);
        resultMap.add(responseMap);
        return resultMap;
    }
}
