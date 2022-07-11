package com.sm.storemanagement.mapper;

import com.sm.storemanagement.dto.UserDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * user관리
 */
@Mapper
public interface UserMapper {
    public UserDTO selectUser(String userName);

    public boolean join(Map<String, Object> param);
}
