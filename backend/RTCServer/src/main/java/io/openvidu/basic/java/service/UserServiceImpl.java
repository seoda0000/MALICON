package io.openvidu.basic.java.service;

import io.openvidu.basic.java.controller.exception.CustomException;
import io.openvidu.basic.java.dto.UserDto;
import io.openvidu.basic.java.redis.entity.UserEntity;
import io.openvidu.basic.java.redis.repository.UserEntityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserEntityRepository userEntityRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDto getUserById(Long id) {
        UserEntity user = userEntityRepository.findById(id).orElseThrow(
                ()->new CustomException(HttpStatus.NOT_FOUND, "존재하지 않는 아이디입니다.")
        );
        return UserDto.builder()
                .userId(user.getUserId())
                .avatar(user.getAvatar())
                .nickName(user.getNickName())
                .build();
    }
}
