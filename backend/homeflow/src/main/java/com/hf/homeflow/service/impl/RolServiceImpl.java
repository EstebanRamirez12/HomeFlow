package com.hf.homeflow.service.impl;

import org.springframework.stereotype.Service;

import com.hf.homeflow.entity.Rol;
import com.hf.homeflow.exception.ResourceNotFoundException;
import com.hf.homeflow.repository.RolRepository;
import com.hf.homeflow.service.RolService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RolServiceImpl implements RolService {

    private final RolRepository rolRepository;

    @Override
    public Rol getRol(Long id) {
        return rolRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El Rol con el id dado no existe: " + id));
    }

}
