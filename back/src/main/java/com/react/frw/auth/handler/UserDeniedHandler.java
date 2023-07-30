package com.react.frw.auth.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class UserDeniedHandler implements AccessDeniedHandler {

  @Override
  public void handle(
    HttpServletRequest request,
    HttpServletResponse response,
    AccessDeniedException accessDeniedException
  ) throws IOException, ServletException {
    log.info("Message : {}", accessDeniedException.getMessage());

    request.setAttribute("errMsg", accessDeniedException.getMessage());
    request
      .getRequestDispatcher("/unAuthenticated")
      .forward(request, response);
  }
}
