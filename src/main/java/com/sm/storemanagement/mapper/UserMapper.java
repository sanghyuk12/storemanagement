package com.sm.storemanagement.mapper;

import com.sm.storemanagement.dto.UserDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * user관리
 */
@Mapper
public interface UserMapper {
    public List<UserDTO> selectUser();
}
