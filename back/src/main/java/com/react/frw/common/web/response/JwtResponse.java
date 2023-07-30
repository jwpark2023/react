package com.react.frw.common.web.response;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JwtResponse {
  private String token;
  @Builder.Default
  private String type = "Bearer";
  private String username;
  private String name;
  private String dept;
  private Collection<? extends GrantedAuthority> authorities;
}