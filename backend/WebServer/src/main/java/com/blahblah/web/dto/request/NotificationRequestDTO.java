package com.blahblah.web.dto.request;

import lombok.*;

@Getter
@AllArgsConstructor
@RequiredArgsConstructor
public class NotificationRequestDTO {
    public String msg;
    public String avatar;
}
