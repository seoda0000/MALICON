package com.blahblah.web.service;


import com.blahblah.web.controller.exception.CustomException;
import com.blahblah.web.dto.MailDto;
import com.blahblah.web.dto.TokenDTO;
import com.blahblah.web.dto.response.UserDTO;
import com.blahblah.web.entity.UserEntity;
import com.blahblah.web.repository.UserRepository;
import com.blahblah.web.util.JWTutil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.message.SimpleMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.CompletableFuture;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender javaMailSender;

    private static final String FROM_ADDRESS = "admin@blahblah.movebxeax.me";

    @Override
    @Transactional(readOnly = true)
    public boolean isExistUserId(String userId) {
        log.info(userId);
        return userRepository.existsByUserId(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean isExistUserNickName(String nickName) {
        log.info(nickName);
        return userRepository.existsByNickName(nickName);
    }

    @Override
    public void mailSend(MailDto mailDto) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailDto.getAddress());
        message.setSubject(mailDto.getTitle());
        message.setFrom(FROM_ADDRESS);
        message.setText(mailDto.getMessage());
        javaMailSender.send(message);
    }

    @Override
    @Transactional
    public void sendAuthStringToEmail(String email) {
        UserEntity userEntity = userRepository.findByEmail(email);

        SecureRandom secureRandom = new SecureRandom();
        int temporaryPassword = secureRandom.nextInt();
        userRepository.updatePasswordByEmail(userEntity.getId(), passwordEncoder.encode(String.valueOf(temporaryPassword)));

        MailDto mailDto = MailDto.builder()
                .title("임시비밀번호 안내")
                .address(email)
                .message("임시 비밀번호: "+temporaryPassword)
                .build();

        CompletableFuture.runAsync(()-> mailSend(mailDto));
    }

    @Override
    public String checkEmail(String email) {
        Random r = new Random();
        int checkNum = r.nextInt(888888)+111111;
        MailDto mailDto = MailDto.builder()
                .title("회원 가입 인증 이메일 입니다")
                .message("인증번호는 "+checkNum+"입니다")
                .address(email)
                .build();
        CompletableFuture.runAsync(()-> mailSend(mailDto));
        return Integer.toString(checkNum);
    }


    @Override
    public UserDTO createUser(UserDTO userDTO) {
        UserEntity s = UserEntity.builder()
                .userId(userDTO.getUserId())
                .nickName(userDTO.getNickName())
                .email(userDTO.getEmail())
                .avatar(userDTO.getAvatar())
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
        return op.orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "존재하지 않는 유저입니다.")).toUserDTO();
    }

    @Override
    public UserDTO readUserByUserId(String userId) {
        return userRepository.findByUserId(userId).
                orElseThrow(()-> new CustomException(HttpStatus.NOT_FOUND, "존재하지 않는 아이디입니다.")).toUserDTO();
    }

    @Override
    public boolean updateUser(UserDTO userDTO) {
        UserEntity user = userRepository.findByUserId(userDTO.getUserId()).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "존재하지 않는 유저입니다."));
        UserEntity updatedUser = UserEntity.builder().id(userDTO.getId()==null?user.getId():userDTO.getId())
                .userId(userDTO.getUserId()==null?user.getUserId():userDTO.getUserId())
                .password(userDTO.getPassword()==null?passwordEncoder.encode(user.getPassword()):passwordEncoder.encode(userDTO.getPassword()))
                .nickName(userDTO.getNickName()==null?user.getNickName():userDTO.getNickName())
                .phoneNumber(userDTO.getPhoneNumber()==null?user.getPhoneNumber():userDTO.getPhoneNumber())
                .lightStick(userDTO.getLightStick()==null?user.getLightStick():userDTO.getLightStick())
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
        UserEntity user = userRepository.findByUserId(userId).orElseThrow(()-> new CustomException(
                HttpStatus.NOT_FOUND, "존재하지 않는 아이디입니다."
        ));
        if(!passwordEncoder.matches(password, user.getPassword()))
            throw new CustomException(HttpStatus.BAD_REQUEST,"잘못된 비밀번호입니다.");

        String accessToken = JWTutil.getJwtToken(((UserEntity) user).toUserDTO());
        String refreshToken = JWTutil.getRefreshToken(((UserEntity) user).toUserDTO());

        return new TokenDTO(accessToken,refreshToken);
    }
}
