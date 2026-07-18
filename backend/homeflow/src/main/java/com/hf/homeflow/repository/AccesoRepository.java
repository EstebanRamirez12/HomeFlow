package com.hf.homeflow.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hf.homeflow.entity.Acceso;
import com.hf.homeflow.entity.Usuario;

public interface AccesoRepository extends JpaRepository<Acceso, Long> {

    Optional<Acceso> findByUsuario(Usuario usuario);
}
