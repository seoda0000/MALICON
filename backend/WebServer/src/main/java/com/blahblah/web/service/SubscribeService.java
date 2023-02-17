package com.blahblah.web.service;

import com.blahblah.web.dto.response.SubscribeDTO;
import com.blahblah.web.entity.UserEntity;
import com.blahblah.web.entity.UserSubscribeEntity;

import java.util.List;

public interface SubscribeService {
    UserSubscribeEntity addSubscribe(long userId, long subscribeId);

    List<SubscribeDTO> readSubscribe(long userId);

    void deleteSubscribe(long userId, long subscribeId);
}