package com.blahblah.web.service;

import com.blahblah.web.controller.exception.CustomException;
import com.blahblah.web.dto.response.SubscribeDTO;
import com.blahblah.web.entity.UserEntity;
import com.blahblah.web.entity.UserSubscribeEntity;
import com.blahblah.web.repository.SubscribeRepository;
import com.blahblah.web.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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
    public List<SubscribeDTO> readSubscribe(long userId) {

        List<UserEntity> result = userRepository.findAllByUserId(userId);
//        UserEntity me = userRepository.findById(userId).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "사용자가 존재하지 않습니다."));
        List<SubscribeDTO> subscribeDTOS = new ArrayList<>();
//        subscribeDTOS.add(SubscribeDTO.builder()
//                        .userPK(me.getId())
//                        .userId(me.getUserId())
//                        .avatar(me.getAvatar())
//                        .nickName(me.getNickName())
//                .build());
        for(UserEntity u: result){
            subscribeDTOS.add(SubscribeDTO.builder()
                    .userPK(u.getId())
                    .userId(u.getUserId())
                    .nickName(u.getNickName())
                    .avatar(u.getAvatar())
                    .build());
        }
        return subscribeDTOS;
    }

    @Override
    public void deleteSubscribe(long userId, long subscribeId) {
        UserSubscribeEntity subscribe = UserSubscribeEntity.builder()
                .userEntity(userRepository.findById(userId).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "구독하려는 사용자가 유효하지 않습니다.")))
                .subscribeUserEntity(userRepository.findById(subscribeId).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "구독하려는 사용자가 유효하지 않습니다.")))
                .build();
        subscribeRepository.delete(subscribe);
    }


}