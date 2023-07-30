package com.react.frw.auth.service;

import javax.annotation.Resource;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.react.frw.auth.UserPrinciple;
import com.react.frw.auth.mapper.UserMstDao;
import com.react.frw.auth.vo.UserMst;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  @Resource(name = "userMstDao")
  private UserMstDao userMstDao;

  @Override
  public UserDetails loadUserByUsername(String userid) throws UsernameNotFoundException {

    log.debug("loadUserByUsername(userid) :: {}", userid);
    UserMst user = userMstDao.getUser(userid)
        .orElseThrow(() -> new UsernameNotFoundException("User not found :: " + userid));
    log.debug("user :: {}", user);

    return UserPrinciple.build(user);
  }

}
