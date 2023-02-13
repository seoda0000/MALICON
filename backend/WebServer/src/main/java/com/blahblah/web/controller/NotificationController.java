package com.blahblah.web.controller;

import com.blahblah.web.dto.NotificationDTO;
import com.blahblah.web.dto.request.NotificationRequestDTO;
import com.blahblah.web.dto.response.Message;
import com.blahblah.web.entity.NotificationEntity;
import com.blahblah.web.service.NotificationService;
import com.blahblah.web.util.JWTutil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequestMapping("/notifications")
@RestController
@Slf4j
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;
    @GetMapping
    public ResponseEntity getNotifications(HttpServletRequest request) {
        long id = JWTutil.getLongIdByAccessToken(request);

        List<NotificationDTO> notificationList = notificationService.getNotifications(id);

        return ResponseEntity.ok(notificationList);
    }

    @PostMapping("/send")
    public ResponseEntity sendNotifications(@RequestBody String msg, HttpServletRequest request) {
        long id = JWTutil.getLongIdByAccessToken(request);

        List<NotificationEntity> notificationEntity = notificationService.sendNotificationToFollowers(id, msg);
        
        if(notificationEntity == null)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Message("알림 전송 실패"));
        } else {
            return ResponseEntity.ok("알림 전송 성공");
        }
    }

    @PostMapping("/send/{userId}")
    public ResponseEntity sendNotificationToSingleUser(@PathVariable long userId, @RequestBody NotificationRequestDTO msg, HttpServletRequest request) {
        long id = JWTutil.getLongIdByAccessToken(request);

        NotificationEntity notificationEntity = notificationService.sendNotificationToSingleUser(userId, msg);
        if(notificationEntity == null)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Message("알림 전송 실패"));
        } else {
            return ResponseEntity.ok("알림 전송 성공");
        }
    }

    @PostMapping("/{notificationId}")
    public ResponseEntity readNotification(@PathVariable Long notificationId, HttpServletRequest request) {
        long id = JWTutil.getLongIdByAccessToken(request);

        NotificationEntity notificationEntity = notificationService.readNotification(notificationId, id);

        if(notificationEntity == null)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Message("알림 읽기 실패"));
        } else {
            return ResponseEntity.ok("알림 읽기 성공");
        }
    }
    
    @DeleteMapping("/{notificationId}")
    public ResponseEntity deleteNotification(@PathVariable Long notificationId, HttpServletRequest request) {
        long id = JWTutil.getLongIdByAccessToken(request);
        
        notificationService.deleteNotification(notificationId, id);
        return ResponseEntity.ok("알림 삭제 성공");
    }
}
