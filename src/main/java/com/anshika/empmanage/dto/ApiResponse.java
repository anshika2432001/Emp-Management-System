package com.anshika.empmanage.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T>{
    private Boolean status;
    private String message;
    private Object result;
    private Integer statusCode;

    public ApiResponse(Boolean status, String message, Object result) {
        this.status = status;
        this.message = message;
        this.result = result;
    }
}

