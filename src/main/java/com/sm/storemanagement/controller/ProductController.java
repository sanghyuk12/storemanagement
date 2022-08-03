package com.sm.storemanagement.controller;

import com.sm.storemanagement.service.ProductService;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Array;
import java.util.*;

@RestController
public class ProductController {

    @Autowired
    ProductService productService;

    @RequestMapping(value = "/api/selectProduct", method = {RequestMethod.POST})
    public ArrayList<Map<String, Object>> selectProduct(@RequestParam Map<String, Object> paramMap) {
        ArrayList<Map<String, Object>> resultMap = new ArrayList<>();
        for(int i=0; i<4; i++) {
            Map<String, Object> responseMap = new HashMap<>();

            responseMap.put("prodNo", i);
            responseMap.put("prodNm", "제품명"+i);
            responseMap.put("division", "재료"+i);
            responseMap.put("division1", i+"개");
            responseMap.put("price", "10000");

            resultMap.add(responseMap);

        }

        return resultMap;
    }

    @RequestMapping(value = "/api/updateProduct", method = {RequestMethod.POST})
    public String updateProduct (
            @RequestParam Map<String, Object> param) throws ParseException {

        JSONParser parser = new JSONParser();

        String data = param.get("gridData").toString();
        JSONArray obj = new JSONArray();


        try {
            obj = (JSONArray) parser.parse(data);
        }catch (ParseException e) {
            System.out.printf("변환실패");
            e.printStackTrace();
        }

        Map<String, Object> response = new HashMap<>();

        productService.updateProd(obj);

        return "success";
    }
}
