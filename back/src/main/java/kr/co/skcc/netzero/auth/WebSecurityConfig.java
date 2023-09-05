package kr.co.skcc.netzero.auth;

import static org.springframework.security.config.Customizer.withDefaults;

import java.util.Arrays;

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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import kr.co.skcc.netzero.auth.handler.UserDeniedHandler;
import kr.co.skcc.netzero.auth.jwt.JwtAuthEntryPoint;
import kr.co.skcc.netzero.auth.jwt.JwtAuthTokenFilter;
import kr.co.skcc.netzero.auth.service.UserAuthProvider;

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
  public CorsConfigurationSource corsFilter() {
    CorsConfiguration config = new CorsConfiguration();

    config.setAllowCredentials(true);
    config.setAllowedOriginPatterns(Arrays.asList("*"));
    config.setAllowedMethods(Arrays.asList("HEAD", "POST", "GET", "DELETE", "PUT"));
    config.setAllowedHeaders(Arrays.asList("*"));

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
  }

  @Bean
  public SecurityFilterChain filterChain(JwtAuthEntryPoint unauthorizedHandler, HttpSecurity http) throws Exception {
    return http
        .cors().configurationSource(corsFilter())
        // .cors(withDefaults())
        .and()
        .csrf().disable()
        .exceptionHandling()
        .and()
        .authorizeRequests() // 인증이 필요한 URL 패턴을 설정
        .antMatchers(
         "/auth/**",
         "/sample/**")
        .permitAll() // 모두 접근 가능
        .anyRequest().authenticated() // 나머지 URL은 모두 인증이 필요
        .and()
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
