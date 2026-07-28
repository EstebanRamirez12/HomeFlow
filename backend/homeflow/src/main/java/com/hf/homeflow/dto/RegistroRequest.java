package com.hf.homeflow.dto;

import lombok.Data;

@Data
public class RegistroRequest {
    private String nombre;
    private String paterno;
    private String materno;
    private String telefono;
    private String correo;
    private String password;
}
