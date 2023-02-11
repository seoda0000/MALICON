package io.openvidu.basic.java.redis.entity;

import lombok.*;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name ="users")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nick_name", nullable = false, unique = true)
    private String nickName;
    @Column(nullable = false)
    private String password;
    @Column(name = "user_id", nullable = false, unique = true)
    private String userId;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(name = "phone_number", unique = true)
    private String phoneNumber;

    private String avatar;

    @Column(name = "light_stick")
    private String lightStick;

    @Builder.Default
    @OneToMany(mappedBy = "userEntity",
            cascade = CascadeType.REMOVE,
            targetEntity = PreviousVideoEntity.class
    )
    private List<PreviousVideoEntity> videos = new ArrayList<>();
}
