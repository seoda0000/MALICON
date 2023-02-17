package com.blahblah.web.dto.response;


import com.blahblah.web.dto.TokenDTO;
import lombok.Getter;

@Getter
public class MessageWithToken extends Message{
    private final TokenDTO token;

    public MessageWithToken(String message, TokenDTO tokenDTO) {
        super(message);
        this.token = tokenDTO;
    }
}
