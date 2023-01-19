package com.blahblah.web.service;


import com.blahblah.web.auth.SsafyUserDetailService;
import com.blahblah.web.controller.exception.InvalidPasswordException;
import com.blahblah.web.dto.TokenDTO;
import com.blahblah.web.dto.response.UserDTO;
import com.blahblah.web.entity.UserEntity;
import com.blahblah.web.repository.UserRepository;
import com.blahblah.web.util.JWTutil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final SsafyUserDetailService userDetailService;

    @Override
    @Transactional(readOnly = true)
    public boolean isExistUserId(String userId) {
        log.info(userId);
        return userRepository.existsByUserId(userId);
    }
    @Override
    public UserDTO createUser(UserDTO userDTO) {
        UserEntity s = UserEntity.builder()
                .userId(userDTO.getUserId())
                .nickName(userDTO.getNickName())
                .email(userDTO.getEmail())
                .avatar(userDTO.getAvatar())
                .aboutMe(userDTO.getAboutMe())
                .lightStick(userDTO.getLightStick())
                .phoneNumber(userDTO.getPhoneNumber())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .build();
        return userRepository.save(s).toUserDTO();
    }

    @Override
    @Transactional(readOnly = true)
    public UserDTO readUser(Long id) {
        Optional<UserEntity> op = userRepository.findById(id);
        if(op.isEmpty()){
            return null;
        }else return op.get().toUserDTO();
    }

    @Override
    public boolean updateUser(UserDTO userDTO) {
        UserEntity user = userRepository.findById(userDTO.getId()).orElseThrow(()->new RuntimeException("존재하지 않는 유저입니다."));
        UserEntity updatedUser = UserEntity.builder().id(userDTO.getId())
                .userId(userDTO.getUserId()==null?user.getUserId():userDTO.getUserId())
                .password(userDTO.getPassword()==null?user.getPassword():userDTO.getPassword())
                .nickName(userDTO.getNickName()==null?user.getNickName():userDTO.getNickName())
                .phoneNumber(userDTO.getPhoneNumber()==null?user.getPhoneNumber():userDTO.getPhoneNumber())
                .lightStick(userDTO.getLightStick()==null?user.getLightStick():userDTO.getLightStick())
                .aboutMe(userDTO.getAboutMe()==null?user.getAboutMe():userDTO.getAboutMe())
                .avatar(userDTO.getAvatar()==null?user.getAvatar():userDTO.getAvatar())
                .email(userDTO.getEmail()==null?user.getEmail():userDTO.getEmail())
                .build();
        userRepository.save(updatedUser);
        return true;
    }

    @Override
    public void deleteUserByUserId(String userId) {
        userRepository.deleteByUserId(userId);
    }

    @Transactional(readOnly = true)
    @Override
    public TokenDTO login(String userId, String password){
        UserDetails user = userDetailService.loadUserByUsername(userId);
        if(user == null) throw new UsernameNotFoundException("존재하지 않는 계정입니다.");
        else if(!passwordEncoder.matches(password, user.getPassword()))
            throw new InvalidPasswordException("잘못된 비밀번호입니다.");

        String accessToken = JWTutil.getJwtToken(((UserEntity) user).toUserDTO());
        String refreshToken = JWTutil.getRefreshToken(((UserEntity) user).toUserDTO());

        return new TokenDTO(accessToken,refreshToken);
    }
}
