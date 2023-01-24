package com.blahblah.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name ="user_subscribes")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSubscribeEntity implements Serializable {

    @Id
    @ManyToOne(
            targetEntity = UserEntity.class,
            fetch = FetchType.LAZY
    )
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @Id
    @ManyToOne(
            targetEntity = UserEntity.class,
            fetch = FetchType.LAZY
    )
    @JoinColumn(name = "subscribe_user_id")
    private UserEntity subscribeUserEntity;

}
