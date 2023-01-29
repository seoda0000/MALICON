package com.blahblah.web.service;

import com.blahblah.web.entity.UserEntity;
import com.blahblah.web.entity.UserSubscribeEntity;

import java.util.List;

public interface SubscribeService {
    UserSubscribeEntity addSubscribe(long userId, long subscribeId);

    List<Long> readSubscribe(long userId);
}