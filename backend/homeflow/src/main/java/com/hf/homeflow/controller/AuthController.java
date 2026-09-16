package com.hf.homeflow.controller;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hf.homeflow.dto.LoginResponseDto;
import com.hf.homeflow.dto.ResetPasswordRequest;
import com.hf.homeflow.dto.LoginRequest;
import com.hf.homeflow.dto.LoginResponseDto;
import com.hf.homeflow.dto.RegistroRequest;
import com.hf.homeflow.entity.Acceso;
import com.hf.homeflow.entity.Usuario;
import com.hf.homeflow.repository.AccesoRepository;
import com.hf.homeflow.repository.GrupoUsuarioRepository;
import com.hf.homeflow.repository.UsuarioRepository;
import com.hf.homeflow.security.JwtService;
import com.hf.homeflow.service.EmailService;

import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    private final UsuarioRepository usuarioRepository;
    private final AccesoRepository accesoRepository;
    private final PasswordEncoder passwordEncoder;
    private final GrupoUsuarioRepository grupoUsuarioRepository;
    private final EmailService emailService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> authenticateUser(@RequestBody LoginRequest request) {
        try {
            // 1. Valida credenciales y estado habilitado (si falla lanza BadCredentialsException o DisabledException)
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getCorreo(), request.getPassword())
            );

            // 2. Reutilizamos el UserDetails que authenticationManager YA obtuvo de la BD
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            // 3. Obtenemos el ID del usuario directamente para la validación del grupo
            Usuario usuario = usuarioRepository.findByCorreo(request.getCorreo())
                    .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

            boolean tieneGrupo = grupoUsuarioRepository.existsByUsuario_IdUsuarioAndEstatusTrue(usuario.getIdUsuario());

            // 4. Generamos token
            String token = jwtService.generateToken(userDetails);

            return ResponseEntity.ok(new LoginResponseDto(token, "Inicio de sesión exitoso", tieneGrupo));

        } catch (DisabledException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new LoginResponseDto(null, "Por favor verifica tu correo primero", false));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponseDto(null, "Correo o contraseña incorrectos", false));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new LoginResponseDto(null, "Error inesperado", false));
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
    public ResponseEntity<LoginResponseDto> registrarUsuario(@RequestBody RegistroRequest request)
            throws MessagingException {

        LocalDate currentDate = LocalDate.now(ZoneId.of("America/Mexico_City"));

        if (usuarioRepository.findByCorreo(request.getCorreo()).isPresent()) {
            return ResponseEntity.badRequest().body(new LoginResponseDto(null, "El correo ya está registrado", false));
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

        emailService.enviarCorreo(usuGuardado.getCorreo(), usuGuardado.getTokenVerificacion(), "activar");

        return ResponseEntity.ok(new LoginResponseDto(null, "Registro exitoso. Revisa tu correo para verificar tu cuenta", false));
    }

    @PatchMapping("/verifyToken")
    public ResponseEntity<LoginResponseDto> verifyToken(@RequestBody String token) {
        System.out.println("ESTE ES MI TOKEN: " + token);

        Optional<Usuario> usuObj = usuarioRepository.findByTokenVerificacion(token);

        if (usuObj.isPresent()) {
            System.out.println("Token encontrado");
            Usuario usuarioUpdate = usuObj.get();
            usuarioUpdate.setVerificado(true);
            usuarioUpdate.setTokenVerificacion(null);

            usuarioRepository.save(usuarioUpdate);

            return ResponseEntity.ok(new LoginResponseDto(null, "Token verificado exitosamente", false));
        } else {
            System.out.println("Token no encontrado");
            return ResponseEntity.badRequest()
                    .body(new LoginResponseDto(null, "El enlace de verificación es inválido o ya fue utilizado", false));
        }
    }
    
    @PostMapping("/recuperar-password")
    public ResponseEntity<?> forgotPass(@RequestBody Map<String, String> request) throws MessagingException {
        
        String correo = request.get("correo"); 
        
        Optional<Usuario> usuObj = usuarioRepository.findByCorreo(correo);
        
        if(usuObj.isPresent()){
            System.out.println("Correo encontrado, generando token...");
            Usuario usuUpdate = usuObj.get();
            usuUpdate.setTokenPassword(UUID.randomUUID().toString());
            
            usuarioRepository.save(usuUpdate);
            
            emailService.enviarCorreo(correo, usuUpdate.getTokenPassword(), "restablecer");
        } else {
            System.out.println("Intento de recuperación para correo no existente: " + correo);
        }
        
        return ResponseEntity.ok(new LoginResponseDto(null, "Si el correo está registrado, recibirás un enlace de recuperación.", false));
    }
    
    @PatchMapping("/resetPassword")
    @Transactional
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        
        Optional<Usuario> usuarioOpt = usuarioRepository.findByTokenPassword(request.getToken());

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(new LoginResponseDto(null, "El token es inválido o ya fue utilizado", false));
        }

        Usuario usuario = usuarioOpt.get();

        Acceso acceso = accesoRepository.findByUsuario(usuario)
                .orElseThrow(() -> new RuntimeException("Acceso no encontrado para este usuario"));
                
        acceso.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        accesoRepository.save(acceso);

        usuario.setTokenPassword(null);
        usuario.setVerificado(true);           // <-- ¡NUEVO! Auto-activamos la cuenta
        usuario.setTokenVerificacion(null);    // <-- ¡NUEVO! Borramos el token de verificación previo

        usuarioRepository.save(usuario);

        return ResponseEntity.ok(new LoginResponseDto(null, "Contraseña actualizada exitosamente", false));
    }
    
    @PostMapping("/resend-verification")
    public ResponseEntity<?> resendVerificationToken(@RequestBody Map<String, String> request) throws MessagingException {
        String correo = request.get("correo");
        
        if (correo == null || correo.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(new LoginResponseDto(null, "El correo es requerido", false));
        }

        Optional<Usuario> usuOpt = usuarioRepository.findByCorreo(correo);

        if (usuOpt.isPresent()) {
            Usuario usuario = usuOpt.get();

            if (usuario.getVerificado() != null && usuario.getVerificado()) {
                return ResponseEntity.badRequest().body(new LoginResponseDto(null, "Esta cuenta ya está verificada. Puedes iniciar sesión.", false));
            }

            usuario.setTokenVerificacion(UUID.randomUUID().toString());
            usuarioRepository.save(usuario);

            emailService.enviarCorreo(usuario.getCorreo(), usuario.getTokenVerificacion(), "activar");

            return ResponseEntity.ok(new LoginResponseDto(null, "Un nuevo correo de verificación ha sido enviado.", false));
        }

        return ResponseEntity.badRequest().body(new LoginResponseDto(null, "No se encontró ningún usuario con este correo.", false));
    }

}
