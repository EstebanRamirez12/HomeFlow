package com.hf.homeflow.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
public class LoginResponseDto {
    private String token;
    private String mensaje;
    private boolean tieneGrupo;
}
