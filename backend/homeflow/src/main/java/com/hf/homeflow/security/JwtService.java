package com.hf.homeflow.security;

import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

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

}
