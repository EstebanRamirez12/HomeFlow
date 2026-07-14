package com.hf.homeflow.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "cat_rol")
public class Rol {

    @Id
    @Column(name = "id_rol")
    private Long idRol;
    private String nombre;
    private boolean estatus;
}
