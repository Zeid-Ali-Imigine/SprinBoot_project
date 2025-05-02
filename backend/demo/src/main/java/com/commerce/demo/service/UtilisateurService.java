package com.commerce.demo.service;

import com.commerce.demo.DTOs.UtilisateurDTO;
import com.commerce.demo.mappers.UtilisateurMapper;
import com.commerce.demo.model.Utilisateur;
import com.commerce.demo.repository.UtilisateurRepository;
import com.commerce.demo.service.base.DtoServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class UtilisateurService extends DtoServiceImpl<Utilisateur, UtilisateurDTO, Long> {

    private final UtilisateurMapper mapper;

    public UtilisateurService(UtilisateurRepository repository, UtilisateurMapper mapper) {
        super(repository);
        this.mapper = mapper;
    }

    @Override protected UtilisateurDTO toDto(Utilisateur entity) { return mapper.toDto(entity); }
    @Override protected Utilisateur toEntity(UtilisateurDTO dto) { return mapper.toEntity(dto); }
    @Override protected void updateEntityFromDto(UtilisateurDTO dto, Utilisateur entity) { mapper.updateUtilisateurFromDto(dto, entity); }
}