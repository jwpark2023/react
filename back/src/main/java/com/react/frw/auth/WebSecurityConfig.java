package com.react.frw.auth;

import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AnyRequestMatcher;

import com.react.frw.auth.handler.UserDeniedHandler;
import com.react.frw.auth.jwt.JwtAuthEntryPoint;
import com.react.frw.auth.jwt.JwtAuthTokenFilter;
import com.react.frw.auth.service.UserAuthProvider;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = false)
public class WebSecurityConfig {

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new SHA246Encoder();
  }

  @Bean
  public UserAuthProvider userAuthProvider(UserDetailsService userDetailsService) {
    UserAuthProvider userAuthProvider = new UserAuthProvider();
    userAuthProvider.setUserDetailsService(userDetailsService);
    userAuthProvider.setPasswordEncoder(passwordEncoder());
    userAuthProvider.setHideUserNotFoundExceptions(false);
    return userAuthProvider;
  }

  @Bean
  public WebSecurityCustomizer webSecurityCustomizer() {
    return web -> web
        .ignoring()
        .antMatchers(
            "/",
            "/index.html",
            "/auth/signin",
            "/assets/**",
            "/js/**",
            "/vendors/**",
            "/user/**",
            "/static/**",
            "/css/**",
            "/img/**",
            "/images/**",
            "/*.ttf",
            "/*.svg",
            "/*.eot",
            "/*.woff",
            "/*.png",
            "/*.woff2",
            "/*.css",
            "/*.js",
            "/*.json",
            "/*.ico");
  }

  @Bean
  public SecurityFilterChain filterChain(JwtAuthEntryPoint unauthorizedHandler, HttpSecurity http) throws Exception {
    http
        .cors(withDefaults())
        .csrf(csrf -> csrf.disable())
        .headers(headers -> headers.frameOptions().disable())
        .authorizeHttpRequests(authz -> authz.antMatchers(
          "/error/**",
          "/h2-console/**",
          "/sample/**",
          "/auth/**",
          "/common/**")
        .permitAll()
        .antMatchers(
          "/menu/**",
          "/code/**")
        .authenticated()
        .anyRequest()
        .denyAll())
        .exceptionHandling(handling -> handling.defaultAccessDeniedHandlerFor(
            new UserDeniedHandler(),
            AnyRequestMatcher.INSTANCE)
            .authenticationEntryPoint(unauthorizedHandler))
        .sessionManagement(management -> management
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS));
    // .httpBasic(withDefaults());
    return http
        .addFilterBefore(
            authenticationJwtTokenFilter(),
            UsernamePasswordAuthenticationFilter.class)
        .build();
  }

  @Bean
  public JwtAuthTokenFilter authenticationJwtTokenFilter() {
    JwtAuthTokenFilter filter = new JwtAuthTokenFilter();
    filter.getFilterConfig();
    return new JwtAuthTokenFilter();
  }
}
