package com.blahblah.web.entity;

import lombok.Getter;

import java.io.Serializable;

@Getter
public class UserSubscribeEntityPK implements Serializable {
    private Long userEntity;
    private Long subscribeUserEntity;
}