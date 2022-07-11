package com.sm.storemanagement.service;

import com.sm.storemanagement.dto.UserDTO;
import com.sm.storemanagement.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class JwtUserDetailsService implements UserDetailsService, Serializable{
    private static final long serialVersionUID = 2311752522558328973L;

    @Autowired
    UserMapper userMapper;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String userName)
            throws UsernameNotFoundException, DataAccessException {

        UserDTO userDTO = getUserDTO(userName);
        if(userDTO == null) {
            throw new UsernameNotFoundException("User not found with username: " + userName);
        }

        List<GrantedAuthority> authorities = new ArrayList<>();
        return new User(userDTO.getUserId(), userDTO.getPassWord(), authorities);
    }

    public boolean join(Map<String, Object> param) {

        return userMapper.join(param);
    }

    public UserDTO getUserDTO(String userName) {

        UserDTO userDTO = userMapper.selectUser(userName);

        return userDTO;

    }

    public HttpServletRequest getRequest() {

        return ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
    }

}
