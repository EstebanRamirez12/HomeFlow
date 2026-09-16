package com.hf.homeflow.entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tbl_grupos")
@Getter @Setter
@NoArgsConstructor  @AllArgsConstructor
public class Grupo {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_grupo")
    private Long idGrupo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usu_creador", nullable = false)
    private Usuario usuarioCreador;

    @Column(name = "nombre", length = 50, nullable = false)
    private String nombre;

    @Column(name = "codigo_invitacion", length = 10, nullable = false, unique = true)
    private String codigoInvitacion;

    @Column(name = "fec_creacion", nullable = false)
    private LocalDate fecCreacion;

    @Column(name = "logo")
    private byte[] logo;

    @Column(name = "estatus", nullable = false)
    private Boolean estatus;

}
