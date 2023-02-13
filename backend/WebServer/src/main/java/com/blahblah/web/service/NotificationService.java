package com.blahblah.web.service;

import com.blahblah.web.dto.NotificationDTO;
import com.blahblah.web.dto.request.NotificationRequestDTO;
import com.blahblah.web.entity.NotificationEntity;

import java.util.List;

public interface NotificationService {
    public List<NotificationDTO> getNotifications(long userPK);
    public List<NotificationEntity> sendNotificationToFollowers(long userId, String msg);
    public NotificationEntity sendNotificationToSingleUser(long userId, NotificationRequestDTO notificationRequestDTO);

    NotificationEntity readNotification(long msgId, long userId);

    void deleteNotification(long msgId, long userId);
}
