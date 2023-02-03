package com.blahblah.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name ="about_me")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AboutMeEntity implements Serializable {
    @Id
    @Column(name="user_id", nullable = false)
    private Long id;

    @OneToOne(
        targetEntity = UserEntity.class,
        fetch = FetchType.LAZY
    )
    @MapsId
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @Column
    private String content;
}
