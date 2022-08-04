package com.sm.storemanagement.service;

import org.json.simple.JSONArray;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ProductService {

    public Map<String, Object> updateProd(JSONArray param) {
        Map<String, Object> resultMap = new HashMap<>();
        for(int i=0; i<param.size(); i++) {
            Map<String, Object> row = (Map<String, Object>) param.get(i);
            switch (row.get("status").toString()) {
                case "add":
                    System.out.println("add");
                    break;
                case "modify":
                    System.out.println("modify");
                    break;
                case "remove":
                    System.out.println("remove");
                    break;
                default:
                    break;
            }
        }

        return resultMap;
    }
}
