package com.hf.homeflow.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hf.homeflow.entity.Rol;
import com.hf.homeflow.service.RolService;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;

@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class TestController {

    private RolService rolService;

    @GetMapping("/getTest")
    public String getTest() {
        Rol rol = rolService.getRol(1L);
        return "Backend: Si " + rol.getNombre();
    }

}
