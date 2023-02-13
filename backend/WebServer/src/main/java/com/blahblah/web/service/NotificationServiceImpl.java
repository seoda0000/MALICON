package com.blahblah.web.service;

import com.blahblah.web.controller.exception.CustomException;
import com.blahblah.web.dto.NotificationDTO;
import com.blahblah.web.dto.request.NotificationRequestDTO;
import com.blahblah.web.entity.NotificationEntity;
import com.blahblah.web.entity.UserEntity;
import com.blahblah.web.entity.UserSubscribeEntity;
import com.blahblah.web.repository.NotificationRepository;
import com.blahblah.web.repository.SubscribeRepository;
import com.blahblah.web.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationServiceImpl implements NotificationService{
    private final NotificationRepository notificationRepository;
    private final SubscribeRepository subscribeRepository;
    private final UserRepository userRepository;
    @Override
    public List<NotificationDTO> getNotifications(long userId) {
        List<NotificationEntity> findResult = notificationRepository.findAllByUserId(userId);
        List<NotificationDTO> result = new ArrayList<>();
        for(NotificationEntity ne : findResult)
            result.add(NotificationDTO.builder()
                            .msgId(ne.getId())
                            .timestamp(ne.getTimestamp())
                            .msg(ne.getMsg())
                            .isRead(ne.isRead())
                    .build());

        return result;
    }

    @Override
    public List<NotificationEntity> sendNotificationToFollowers(long userId, String msg) {
        List<UserSubscribeEntity> userSubscribeEntityList = subscribeRepository.findAllBySubscribeUserId(userId);

        List<NotificationEntity> notificationEntityList = new ArrayList<>();

        Long timestamp = LocalDateTime.now().toInstant(ZoneOffset.of("+9")).toEpochMilli();

        for(UserSubscribeEntity ue : userSubscribeEntityList) {
            notificationEntityList.add(
                    NotificationEntity.builder()
                            .timestamp(timestamp)
                            .userEntity(ue.getUserEntity())
                            .userId(ue.getUserId())
                            .msg(msg)
                            .isRead(false)
                            .build()
            );
        }

        return notificationRepository.saveAll(notificationEntityList);
    }

    @Override
    public NotificationEntity sendNotificationToSingleUser(long userId, NotificationRequestDTO notificationRequestDTO) {
        UserEntity userEntity = userRepository.findById(userId).orElseThrow(()-> new CustomException(HttpStatus.NOT_FOUND, "잘못된 사용자 id 입니다."));

        Long timestamp = LocalDateTime.now().toInstant(ZoneOffset.of("+9")).toEpochMilli();
        return notificationRepository.save(NotificationEntity.builder()
                        .timestamp(timestamp)
                        .userEntity(userEntity)
                        .userId(userId)
                        .msg(notificationRequestDTO.msg)
                        .isRead(false)
                .build());
    }

    @Override
    public NotificationEntity readNotification(long msgId, long userId) {
        NotificationEntity notificationEntity = notificationRepository.findById(msgId).orElseThrow(()-> new CustomException(HttpStatus.NOT_FOUND, "잘못된 메세지 id입니다."));

        if(notificationEntity.getUserId() == userId)
            return notificationRepository.save(NotificationEntity.builder()
                    .id(msgId)
                    .timestamp(notificationEntity.getTimestamp())
                    .userEntity(notificationEntity.getUserEntity())
                    .userId(notificationEntity.getUserId())
                    .msg(notificationEntity.getMsg())
                    .isRead(true)
                    .build());
        else
            throw new CustomException(HttpStatus.FORBIDDEN, "권한 없음");
    }

    @Override
    public void deleteNotification(long msgId, long userId) {
        NotificationEntity notificationEntity = notificationRepository.findById(msgId).orElseThrow(()-> new CustomException(HttpStatus.NOT_FOUND, "잘못된 메세지 id입니다."));

        if(notificationEntity.getUserId() == userId)
            notificationRepository.deleteById(msgId);
    }
}
