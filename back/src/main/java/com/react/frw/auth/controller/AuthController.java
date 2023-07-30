package com.react.frw.auth.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Description;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.react.frw.auth.UserPrinciple;
import com.react.frw.auth.jwt.JwtProvider;
import com.react.frw.common.web.request.LoginForm;
import com.react.frw.common.web.response.JwtResponse;
import com.react.frw.common.web.response.Messages;
import com.react.frw.common.web.response.ResultDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  JwtProvider jwtProvider;

  @Description("로그인")
  @PostMapping(value = "signin")
  public ResponseEntity<ResultDto> signin(@Valid @RequestBody LoginForm loginRequest, BindingResult bindingResult) {
    ResultDto resultDto = ResultDto.builder().build();

    if (bindingResult.hasErrors()) {
      Messages messages = new Messages();
      bindingResult.getAllErrors().stream().forEach(e -> messages.setMessage(e.getDefaultMessage()));
      resultDto.setCode("E0000001");
      resultDto.setDataSet(messages);
      return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }

    JwtResponse jwtResponse = null;

    try {
      Authentication authentication = authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

      String authToken = jwtProvider.generateJwtToken(authentication);
      UserPrinciple userDetails = (UserPrinciple) authentication.getPrincipal();
      jwtResponse = JwtResponse.builder()
          .token(authToken)
          .username(userDetails.getUsername())
          .name(userDetails.getUser().getUsername())
          .build();
      resultDto.setDataSet(jwtResponse);
    } catch (UsernameNotFoundException e) {
      resultDto.setCode("E00010001");
      resultDto.setMessage("ID 비밀번호가 일치하지 않습니다.");
    } catch (BadCredentialsException e) {
      resultDto.setCode("E00010002");
      resultDto.setMessage("ID 비밀번호가 일치하지 않습니다.");
    } catch (Exception e) {
      log.info("Exception {}", e);
      resultDto.setCode("E00010003");
      resultDto.setMessage("로그인중 오류 발생");
    }

    return new ResponseEntity<>(resultDto, HttpStatus.OK);
  }

  @Description("로그아웃")
  @GetMapping(value = "logout")
  public @ResponseBody ResponseEntity<ResultDto> logout() {
    ResultDto resultDto = ResultDto.builder().build();
    resultDto.setMessage("logout되었습니다.");

    return new ResponseEntity<>(resultDto, HttpStatus.OK);
  }

  @Description("사용자 인증 정보")
  @GetMapping(value = "check")
  public @ResponseBody ResponseEntity<ResultDto> check(Principal principal) {
    ResultDto resultDto = ResultDto.builder().build();

    HttpHeaders httpHeaders = new HttpHeaders();

    Map<String, Object> dm = new HashMap<>();
    UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) principal;
    if (token.isAuthenticated()) {
      UserPrinciple userPrinciple = (UserPrinciple) token.getPrincipal();

      dm.put("userid", userPrinciple.getUsername());
      dm.put("userName", token.getName());
      dm.put("isAuth", true);
      dm.put("message", "login");
    } else {
      dm.put("userid", "");
      dm.put("userName", "");
      dm.put("isAuth", false);
      dm.put("message", "logout");
    }
    // UsernamePasswordAuthenticationToken, Principal:,
    resultDto.setDataSet(dm);

    return new ResponseEntity<>(resultDto, httpHeaders, HttpStatus.OK);
  }
}
