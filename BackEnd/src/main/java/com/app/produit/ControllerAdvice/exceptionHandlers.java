package com.app.produit.ControllerAdvice;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;


import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;



@RestControllerAdvice
public class exceptionHandlers {
    @RestControllerAdvice
    public static class NoValuePresentAdvice {

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ErrorResponse> handleNoValuePresentException() {
        ErrorResponse error = new ErrorResponse();
        error.setStatus(HttpStatus.NOT_FOUND.value());
        error.setMessage("No such element!");
        error.setTimestamp(LocalDateTime.now());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    }

    @RestControllerAdvice
    public static class EmptyResultDataAccessAdvice{
        @ExceptionHandler(EmptyResultDataAccessException.class)
        public ResponseEntity<ErrorResponse> handleEmptyResultDataAccessException() {
            ErrorResponse error = new ErrorResponse();
            error.setStatus(HttpStatus.BAD_REQUEST.value());
            error.setMessage("No such element!");
            error.setTimestamp(LocalDateTime.now());
            return new ResponseEntity<>(error,HttpStatus.BAD_REQUEST);
            
        }
    }
    @RestControllerAdvice
    public static class AdminExceptionHandlerAdvice {
     
        @ExceptionHandler(DataIntegrityViolationException.class)
        public ResponseEntity<ErrorResponse> handleDataIntegrityViolationException(DataIntegrityViolationException e) {
            ErrorResponse error = new ErrorResponse();
            error.setStatus(HttpStatus.CONFLICT.value());
            if(e.getMessage().contains("produit.nom")){
                error.setMessage("Le nom est deja utilisé!");
            }
            error.setTimestamp(LocalDateTime.now());
            return new ResponseEntity<>(error, HttpStatus.CONFLICT);
        }
    }
}
