package com.hf.homeflow.security;

import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hf.homeflow.entity.Acceso;
import com.hf.homeflow.entity.Usuario;
import com.hf.homeflow.repository.AccesoRepository;
import com.hf.homeflow.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;
    private final AccesoRepository accesoRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByCorreo(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "No se encontró usuario registrado con ese correo: " + username));

        /*
         * if (Boolean.FALSE.equals(usuario.getVerificado())) {
         * throw new DisabledException("Por favor verifica tu correo primero");
         * }
         */

        Acceso acceso = accesoRepository.findByUsuario(usuario)
                .orElseThrow(
                        () -> new UsernameNotFoundException("No se encontraron acceso para ese usuario " + username));

        return org.springframework.security.core.userdetails.User.builder()
                .username(usuario.getCorreo())
                .password(acceso.getPasswordHash())
                .disabled(!usuario.getVerificado())
                .roles("USER")
                .build();
    }
}
