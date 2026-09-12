package com.hf.homeflow.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppLayoutResponseDto {

	private String nombre;
	private String correo;
	private String workspaceInicial;
	private List<MenuItemDto> menus;
	private String iniciales;

}
