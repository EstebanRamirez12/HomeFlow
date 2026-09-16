package com.hf.homeflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hf.homeflow.entity.GrupoUsuario;

public interface GrupoUsuarioRepository extends JpaRepository<GrupoUsuario, Long> {
	// Retorna true si existe un registro activo para este usuario
    boolean existsByUsuario_IdUsuarioAndEstatusTrue(Long idUsuario);
}
