package com.blahblah.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class NotificationDTO {
    private long msgId;
    private long timestamp;
    private String msg;
    private boolean isRead;
    private String avatar;
}
