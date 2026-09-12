package com.hf.homeflow.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuItemDto {
	
	private Short idMenu;
	private String opcion;
	private Short orden;
	private String ruta;
	private String icono;
}
