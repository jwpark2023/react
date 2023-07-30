package com.react.frw.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import com.react.frw.auth.service.UserAuthProvider;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class PasswordAuthenticationManager implements  AuthenticationManager{

  @Autowired
  UserAuthProvider userAuthProvider;
  
  @Override
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    return userAuthProvider.authenticate(authentication);
  }
  
}
