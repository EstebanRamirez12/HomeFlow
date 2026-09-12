package com.hf.homeflow.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.hf.homeflow.constants.GeneralConstants;
import com.hf.homeflow.dto.AppLayoutResponseDto;
import com.hf.homeflow.dto.MenuItemDto;
import com.hf.homeflow.entity.Usuario;
import com.hf.homeflow.repository.MenuRepository;
import com.hf.homeflow.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AppLayoutServiceImpl {

	private final MenuRepository menuRepository;
	private final UsuarioRepository usuarioRepository;
	
	public AppLayoutResponseDto getLayout(Authentication authentication) {
		
		String correo = authentication.getName();
		Optional<Usuario> usuario = usuarioRepository.findByCorreo(correo);
		
		Usuario usuarioData = usuario.get();
		
		List<MenuItemDto> menus = menuRepository.findMenusByRol(GeneralConstants.ROL_MIEMBRO);
		
		String nombreCompleto = usuarioData.getNombre() + " " + usuarioData.getPaterno();
		String iniciales = usuarioData.getNombre().substring(0, 1) + usuarioData.getPaterno().substring(0, 1);
		
		return new AppLayoutResponseDto(nombreCompleto.toUpperCase(), 
				usuarioData.getCorreo(), 
				GeneralConstants.ESPACIO_PERSONAL, 
				menus, iniciales.toUpperCase());
	}
}
