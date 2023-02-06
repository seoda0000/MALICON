package io.openvidu.basic.java.util;

import io.jsonwebtoken.*;
import io.openvidu.basic.java.dto.UserDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtUtil {
    private static String SECRET_KEY;
    private JwtUtil(@Value("${jwt.secret}") String secretKey){
        SECRET_KEY = secretKey;
    };

    public static String getAccessTokenFromHeader(HttpServletRequest request){
        return request.getHeader("Authorization").substring(7);
    }

    public static Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    public static UserDto getUserDtoFromClaims(Claims claims){
        return UserDto.builder()
                .userId((String)claims.get("userId"))
                .avatar((String) claims.get("avatar"))
                .nickName((String) claims.get("nickName"))
                .build();
    }
}
