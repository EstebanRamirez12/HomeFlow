package com.hf.homeflow.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import com.hf.homeflow.dto.AppLayoutResponseDto;
import com.hf.homeflow.service.impl.AppLayoutServiceImpl;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/app/")
@RequiredArgsConstructor
public class AppLayoutController {
	
	private final AppLayoutServiceImpl appLayoutService;

	@GetMapping("/layout-data")
	public ResponseEntity<AppLayoutResponseDto> getLayoutData(Authentication authentication) {
		
		AppLayoutResponseDto layoutResponseDto = appLayoutService.getLayout(authentication);
		
		return ResponseEntity.ok(layoutResponseDto);
			
	}
	
}
