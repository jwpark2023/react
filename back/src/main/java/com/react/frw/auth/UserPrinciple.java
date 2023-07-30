package com.react.frw.auth;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.react.frw.auth.vo.UserMst;

public class UserPrinciple implements UserDetails {
  private static final long serialVersionUID = 7798648603916108502L;
  private String username;
  private String password;
  private UserMst user = null;

  private Collection<? extends GrantedAuthority> authorities;

  public UserPrinciple(UserMst user,
      Collection<? extends GrantedAuthority> authorities) {
    super();
    this.username = user.getUsername();
    this.password = user.getPassword();
    this.user = user;
    this.authorities = authorities;
  }

  public static UserPrinciple build(UserMst user) {
    List<GrantedAuthority> authorities = new ArrayList<>();
    // authorities.add(new SimpleGrantedAuthority(user.getRoleKey()));
    return new UserPrinciple(user, authorities);
  }

  public UserMst getUser() {
    return user;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj)
      return true;
    if (obj == null || getClass() != obj.getClass())
      return false;

    UserPrinciple user = (UserPrinciple) obj;
    return Objects.equals(username, user.username);
  }
}
