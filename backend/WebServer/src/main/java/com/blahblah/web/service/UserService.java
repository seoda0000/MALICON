package com.blahblah.web.service;


import com.blahblah.web.dto.TokenDTO;
import com.blahblah.web.dto.response.UserDTO;

public interface UserService {
    boolean isExistUserId(String userId);
    UserDTO createUser(UserDTO userDTO);
    
    UserDTO readUser(Long id);

    UserDTO readUserByUserId(String userId);
    boolean updateUser(UserDTO userDTO);
    void deleteUserByUserId(String userId);

    TokenDTO login(String userId, String password);
}
