package com.nordic.db.configuration;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.nordic.db.util.PasswordSerializer;

public class Credentials {
    private String username;
    
    @JsonSerialize(using = PasswordSerializer.class)
    private char[] password;

    public String getUsername() {
        return this.username;
    }

    public char[] getPassword() {
        return this.password;
    }
}
