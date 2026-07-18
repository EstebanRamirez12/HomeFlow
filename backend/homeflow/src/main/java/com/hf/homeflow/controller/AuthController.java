package com.hf.homeflow.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hf.homeflow.dto.AuthResponse;
import com.hf.homeflow.dto.LoginRequest;
import com.hf.homeflow.security.JwtService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity authenticateUser(@RequestBody LoginRequest request) {
        generarMiHash();

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

}
