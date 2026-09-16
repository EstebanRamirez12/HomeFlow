package com.hf.homeflow.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "tbl_grupo_usuario")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class GrupoUsuario {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_grupo_usuario")
    private Long idGrupoUsuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_grupo", nullable = false)
    private Grupo grupo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_rol_grupo", nullable = false)
    private Rol rolGrupo;

    @Column(name = "fec_ingreso", nullable = false)
    private LocalDate fecIngreso;

    @Column(name = "fec_salida") // Nulo mientras el usuario siga activo en el grupo
    private LocalDate fecSalida;

    @Column(name = "estatus", nullable = false)
    private Boolean estatus;
}
