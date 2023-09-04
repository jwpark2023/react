package kr.co.skcc.netzero.auth.jwt;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import javax.annotation.PostConstruct;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import kr.co.skcc.netzero.auth.UserPrinciple;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtProvider {

  Integer jwtExpiration = 7 * 24 * 60 * 60;
  String password = "testtesttestestestettesetesttesttestestestettesetesttesttestestestettesetesttesttestestestettesetesttesttestestestettese";

  Key key = null;

  @PostConstruct
  public void init() {
    byte[] hash = password.getBytes(StandardCharsets.UTF_8);
    key = new SecretKeySpec(hash, "HmacSHA512");
  }

  public String generateJwtToken(Authentication authentication) {
    UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();

    return Jwts
        .builder()
        .setSubject(userPrinciple.getUsername())
        .setIssuedAt(new Date())
        .setExpiration(
            new Date(
                new Date().getTime() + jwtExpiration * 1000))
        .signWith(key, SignatureAlgorithm.HS512)
        .compact();
  }

  public boolean validateJwtToken(String authToken) {
    try {
      Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(authToken);
      return true;
    } catch (SignatureException e) {
      log.error("Invalid JWT signature -> Message: {} ");
    } catch (SecurityException e) {
      log.error("Invalid JWT signature -> Message: {} ");
    } catch (MalformedJwtException e) {
      log.error("Invalid JWT token -> Message: {}");
    } catch (ExpiredJwtException e) {
      log.error("Expired JWT token -> Message: {}");
    } catch (UnsupportedJwtException e) {
      log.error("Unsupported JWT token -> Message: {}");
    } catch (IllegalArgumentException e) {
      log.error("JWT claims string is empty -> Message: {}");
    }

    return false;
  }

  public String getUserNameFromJwtToken(String token) {
    return Jwts
        .parserBuilder()
        .setSigningKey(key)
        .build()
        .parseClaimsJws(token)
        .getBody()
        .getSubject();
  }
}
