package com.blahblah.gateway.jwt;

import com.blahblah.gateway.exception.JwtAuthenticationException;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class JwtUtil {
    private static String SECRET_KEY;

    @Autowired
    private JwtUtil(@Value("${jwt.secret}") String secretKey){
        SECRET_KEY = secretKey;
    };

    public static boolean isValidToken(String token){
        try {
            Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("Invalid JWT Token", e);
            throw new JwtAuthenticationException("유효하지 않은 토큰입니다.", HttpStatus.UNAUTHORIZED);
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT Token", e);
            throw new JwtAuthenticationException("만료된 토큰입니다.", HttpStatus.REQUEST_TIMEOUT);
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT Token", e);
            throw new JwtAuthenticationException("지원하지 않는 토큰입니다.",HttpStatus.NOT_ACCEPTABLE);
        } catch (IllegalArgumentException e) {
            log.info("JWT claims string is empty.", e);
            throw new JwtAuthenticationException("토큰의 클레임이 비어있습니다",HttpStatus.PRECONDITION_FAILED);
        }
    }

    public static Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}
