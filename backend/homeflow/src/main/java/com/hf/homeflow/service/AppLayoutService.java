package com.hf.homeflow.service;

import org.springframework.security.core.Authentication;

import com.hf.homeflow.dto.AppLayoutResponseDto;

public interface AppLayoutService {
	AppLayoutResponseDto getLayout(Authentication authentication);
}
