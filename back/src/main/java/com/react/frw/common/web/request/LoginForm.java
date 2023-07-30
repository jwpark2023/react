package com.react.frw.common.web.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class LoginForm {
    @NotBlank(message = "username은 필수 값입니다.")
    @Size(min=3, max = 50, message = "계정명은 3 ~ 50 자리 이어야 합니다.")
    private String username;

    @NotBlank
    @Size(min=3, max = 50, message = "비밀번호는 6 ~ 40 자리 이어야 합니다.")
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}