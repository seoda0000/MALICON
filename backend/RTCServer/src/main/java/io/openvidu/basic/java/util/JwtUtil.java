package io.openvidu.basic.java.util;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.openvidu.basic.java.dto.UserDto;
import io.openvidu.basic.java.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.security.Key;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtUtil {
    private final Key SECRET_KEY;
    private final UserService userService;

    @Autowired
    public JwtUtil(@Value("${jwt.secret}") String secretKey, UserService userService){
        SECRET_KEY = Keys.hmacShaKeyFor(secretKey.getBytes());
        this.userService = userService;
    };

    public String getAccessTokenFromHeader(HttpServletRequest request){
        return request.getHeader("Authorization").substring(7);
    }

    public Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    public Long getIdFromClaims(Claims claims){
        return ((Integer)claims.get("id")).longValue();
    }

    public UserDto getUserFromToken (HttpServletRequest request){
        String accessToken = getAccessTokenFromHeader(request);
        Claims claims = parseClaims(accessToken);
        Long id = getIdFromClaims(claims);
        return userService.getUserById(id);
    }
}
