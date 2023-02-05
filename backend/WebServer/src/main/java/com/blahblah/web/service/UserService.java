package com.blahblah.web.service;


import com.blahblah.web.dto.MailDto;
import com.blahblah.web.dto.TokenDTO;
import com.blahblah.web.dto.response.UserDTO;
import com.blahblah.web.entity.UserEntity;

import javax.transaction.Transactional;

public interface UserService {
    boolean isExistUserId(String userId);

    boolean isExistUserNickName(String nickName);

    void mailSend(MailDto mailDto);

    @Transactional
    void sendAuthStringToEmail(String email);

    String checkEmail(String email);

    UserDTO createUser(UserDTO userDTO);
    
    UserDTO readUser(Long id);

    UserDTO readUserByUserId(String userId);

    boolean updateUser(UserDTO userDTO);

    void deleteUserByUserId(String userId);

    TokenDTO login(String userId, String password);
}
