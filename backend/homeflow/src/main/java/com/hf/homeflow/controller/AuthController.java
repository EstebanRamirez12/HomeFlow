package com.hf.homeflow.controller;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hf.homeflow.dto.AuthResponse;
import com.hf.homeflow.dto.LoginRequest;
import com.hf.homeflow.dto.RegistroRequest;
import com.hf.homeflow.entity.Acceso;
import com.hf.homeflow.entity.Usuario;
import com.hf.homeflow.repository.AccesoRepository;
import com.hf.homeflow.repository.UsuarioRepository;
import com.hf.homeflow.security.JwtService;
import com.hf.homeflow.service.EmailService;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;

    private final UsuarioRepository usuarioRepository;
    private final AccesoRepository accesoRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @PostMapping("/login")
    public ResponseEntity authenticateUser(@RequestBody LoginRequest request) {
        // generarMiHash();

        try {
            // Gerente valida pass
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getCorreo(), request.getPassword()));

            // pass ok cargar datos del usuario
            UserDetails user = userDetailsService.loadUserByUsername(request.getCorreo());

            // genera y manda token
            String token = jwtService.generateToken(user);
            return ResponseEntity.ok(new AuthResponse(token, "login exitoso"));

        } catch (DisabledException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new AuthResponse(null, "Por favor verifica tu correo primero"));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(null, "Correo o contraseña incorrectos"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthResponse(null, "Error inesperado"));
        }

    }

    private void generarMiHash() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String miNuevoHash = encoder.encode("1234abcd");
        System.out.println("==================================");
        System.out.println("TU NUEVO HASH ES: " + miNuevoHash);
        System.out.println("==================================");
    }

    @PostMapping("/registro")
    public ResponseEntity<AuthResponse> registrarUsuario(@RequestBody RegistroRequest request)
            throws MessagingException {

        LocalDate currentDate = LocalDate.now(ZoneId.of("America/Mexico_City"));

        if (usuarioRepository.findByCorreo(request.getCorreo()).isPresent()) {
            return ResponseEntity.badRequest().body(new AuthResponse(null, "El correo ya está registrado"));
        }

        // crear y guardar usuario
        Usuario nuevoUsu = new Usuario();
        nuevoUsu.setNombre(request.getNombre());
        nuevoUsu.setPaterno(request.getPaterno());
        nuevoUsu.setMaterno(request.getMaterno());
        nuevoUsu.setCorreo(request.getCorreo());
        nuevoUsu.setTelefono(request.getTelefono());
        nuevoUsu.setVerificado(false);
        nuevoUsu.setFecCreacion(currentDate);
        nuevoUsu.setEstatus(true);
        nuevoUsu.setTokenVerificacion(UUID.randomUUID().toString());

        Usuario usuGuardado = usuarioRepository.save(nuevoUsu);

        Acceso nuevoAcceso = new Acceso();
        nuevoAcceso.setUsuario(usuGuardado);
        nuevoAcceso.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        nuevoAcceso.setEstatus(true);
        nuevoAcceso.setFecCreacion(currentDate);
        nuevoAcceso.setFecUltAcceso(currentDate);

        accesoRepository.save(nuevoAcceso);

        System.out.println("=============================================");
        System.out.println("TOKEN DE VERIFICACIÓN PARA " + request.getCorreo() + ":");
        System.out.println(usuGuardado.getTokenVerificacion());
        System.out.println("=============================================");

        emailService.enviarCorreoVerificacion(usuGuardado.getCorreo(), usuGuardado.getTokenVerificacion());

        return ResponseEntity.ok(new AuthResponse(null, "Registro exitoso. Revisa tu correo para verificar tu cuenta"));
    }

    @PatchMapping("/verifyToken")
    public ResponseEntity<AuthResponse> verifyToken(@RequestBody String token) {
        System.out.println("ESTE ES MI TOKEN: " + token);

        Optional<Usuario> usuObj = usuarioRepository.findByTokenVerificacion(token);

        if (usuObj.isPresent()) {
            System.out.println("Token encontrado");
            Usuario usuarioUpdate = usuObj.get();
            usuarioUpdate.setVerificado(true);
            usuarioUpdate.setTokenVerificacion(null);

            usuarioRepository.save(usuarioUpdate);

            return ResponseEntity.ok(new AuthResponse(null, "Token verificado exitosamente"));
        } else {
            System.out.println("Token no encontrado");
            return ResponseEntity.badRequest()
                    .body(new AuthResponse(null, "El enlace de verificación es inválido o ya fue utilizado"));
        }
    }

}
