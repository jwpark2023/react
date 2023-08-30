package com.react.frw.auth.vo;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserMst {
    @NotEmpty(message = "아이디를 입력해 주십시오.")
    @Size(min = 2, max = 20, message = "사용자 아이디는 2자리 이상 20자 이하만 가능 합니다.")
    @Pattern(regexp = "^[0-9a-zA-Z._]*$", message = "사용자 아이디는 영문자, 숫자, ._ 조합만 가능 합니다.")
    private String username;

    @Setter
    @JsonIgnore
    @Pattern(
            regexp = "(.*(?=^.{8,15}$)(?=.*\\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*?_~+=]).*$)|{0}", message = "숫자 영문자 특수 문자를 포함한 8 ~ 15 자를 입력하세요.")
    private String password;
}
