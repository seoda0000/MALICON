package com.blahblah.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;

@Entity
@Table(name ="notifications")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicUpdate
public class NotificationEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "user_id", nullable = false, insertable = false, updatable = false)
    private long userId;

    @Column(nullable = false)
    private String msg;

    @Column(nullable = false)
    private boolean isRead;

    @Column(name = "timestamp", nullable = false)
    private long timestamp;

    @ManyToOne(targetEntity = UserEntity.class,
            fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;
}
