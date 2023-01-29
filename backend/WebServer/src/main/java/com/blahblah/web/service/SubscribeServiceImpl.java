package com.blahblah.web.service;

import com.blahblah.web.controller.exception.CustomException;
import com.blahblah.web.entity.UserEntity;
import com.blahblah.web.entity.UserSubscribeEntity;
import com.blahblah.web.repository.SubscribeRepository;
import com.blahblah.web.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class SubscribeServiceImpl  implements SubscribeService {

    private final SubscribeRepository subscribeRepository;

    private final UserRepository userRepository;

    @Override
    public UserSubscribeEntity addSubscribe(long userId, long subscribeId) {
        UserSubscribeEntity subscribe = UserSubscribeEntity.builder()
                .userEntity(userRepository.findById(userId).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "구독하려는 사용자가 유효하지 않습니다.")))
                .subscribeUserEntity(userRepository.findById(subscribeId).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "구독하려는 사용자가 유효하지 않습니다.")))
                .build();
        return subscribeRepository.save(subscribe);
    }

    @Override
    public List<Long> readSubscribe(long userId) {

        return subscribeRepository.findAllByUserId(userId);
    }


}