package com.sm.storemanagement.controller;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Array;
import java.util.*;

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

    @RequestMapping(value = "/api/updateProduct", method = {RequestMethod.POST})
    public String updateProduct (
            @RequestParam(required = false) Map<String, Object> param) throws ParseException {
        JSONParser parser = new JSONParser();
//        String data = param.get("data").toString();
        JSONArray obj = new JSONArray();


//        try {
////            obj = (JSONArray) parser.parse(data);
//        }catch (ParseException e) {
//            System.out.printf("변환실패");
//            e.printStackTrace()99;
//        }
        return "success";
    }
}
