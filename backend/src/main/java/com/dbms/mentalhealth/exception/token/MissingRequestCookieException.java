package com.dbms.mentalhealth.exception.token;

public class MissingRequestCookieException extends RuntimeException {
    public MissingRequestCookieException(String message) {
        super(message);
    }
}
