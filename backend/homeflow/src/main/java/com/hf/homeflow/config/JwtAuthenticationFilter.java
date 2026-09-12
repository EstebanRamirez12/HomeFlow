package com.hf.homeflow.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.hf.homeflow.security.JwtService;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    // Cambia JwtService por el nombre de la clase que usaste para crear el token en el Login
    private final JwtService jwtService; 
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String correoUsuario;

        // 1. Si no hay token o no empieza con "Bearer ", dejamos que la petición siga (será bloqueada más adelante si la ruta es protegida)
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2. Extraemos el token quitando "Bearer " (los primeros 7 caracteres)
        jwt = authHeader.substring(7);
        
        // 3. Extraemos el correo del token (necesitas tener este método en tu JwtService)
        correoUsuario = jwtService.extractUsername(jwt); 

        // 4. Si hay un correo y el usuario aún no está autenticado en este contexto
        if (correoUsuario != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            
            // Buscamos al usuario en la base de datos
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(correoUsuario);

            // Verificamos que el token sea válido para este usuario
            if (jwtService.isTokenValid(jwt, userDetails)) {
                
                // Creamos el objeto de autenticación
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // ¡Punto clave! Registramos al usuario en Spring Security
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        
        // Pasamos al siguiente filtro
        filterChain.doFilter(request, response);
    }
}