package com.hf.homeflow.security;

import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;

/*
    Esta clase se encarga de controlar todo lo relacionado con los tokens
*/
@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;

    private Key getSignInKey() {
        // Convierte texto secreto a bytes y genera la llave criptográfica
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + (1000 * 60 * 60 * 24)))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    /**
     * Valida que el token pertenezca al usuario y que no haya expirado
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    /**
     * Verifica si el token ya superó su fecha límite
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Extrae la fecha de expiración del token directamente
     */
    private Date extractExpiration(String token) {
        return extractAllClaims(token).getExpiration();
    }

    /**
     * Desencripta el token usando tu clave secreta para leer su contenido
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder() 
                .setSigningKey(getSignInKey()) // Asegúrate de tener este método que devuelve tu Key
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

}
