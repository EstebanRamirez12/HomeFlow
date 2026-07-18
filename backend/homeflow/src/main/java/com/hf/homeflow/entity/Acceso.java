package com.hf.homeflow.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbl_accesos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Acceso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_acceso")
    private Long idAcceso;

    // No se requeire @Column porque JoinColumn ya sabe que se refire a ese campo de
    // la BD
    @OneToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @Column(name = "password_hash")
    private String passwordHash;

    @Column(name = "fec_creacion")
    private LocalDate fecCreacion;

    @Column(name = "fec_ult_acceso")
    private LocalDate fecUltAcceso;
    private Boolean estatus;

}
