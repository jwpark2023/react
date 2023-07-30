package com.react.frw.auth.service;

import javax.annotation.Resource;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.react.frw.auth.UserPrinciple;
import com.react.frw.auth.mapper.UserMstDao;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class UserAuthProvider extends DaoAuthenticationProvider {
	@Resource(name = "userMstDao")
	private UserMstDao userMstDao;
	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		UsernamePasswordAuthenticationToken authToken = (UsernamePasswordAuthenticationToken) authentication; 
		UserPrinciple userDetail = (UserPrinciple)getUserDetailsService().loadUserByUsername(authToken.getName());
		
		if (userDetail == null) {
			throw new UsernameNotFoundException(authToken.getName());
		}
		String encPwd = (String)authToken.getCredentials();

		if (!matchPassword(userDetail.getPassword(), encPwd)) {
			throw new BadCredentialsException("not matching username or password");
		}
		
		return new UsernamePasswordAuthenticationToken(userDetail, userDetail.getPassword(), userDetail.getAuthorities());
	}

	private boolean matchPassword(String password, String credentials) {
		boolean bRtn = getPasswordEncoder().matches(credentials, password);
		log.info("rst : {}, password : {},  credentials, {}, encode : {}", bRtn, password, credentials, getPasswordEncoder().encode(password));
		return bRtn;
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
	}
}
