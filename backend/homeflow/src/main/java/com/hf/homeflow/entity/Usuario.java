package com.hf.homeflow.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbl_usuarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long idUsuario;
    private String nombre;
    private String paterno;
    private String materno;

    @Column(unique = true)
    private String correo;
    private String telefono;
    private Boolean verificado;

    @Column(name = "fec_creacion")
    private LocalDate fecCreacion;
    private Boolean estatus;

    @Column(name = "token_verificacion")
    private String tokenVerificacion;
    
    @Column(name = "token_password")
    private String tokenPassword;

}
