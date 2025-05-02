package com.commerce.demo.mappers;

import com.commerce.demo.DTOs.UtilisateurDTO;
import com.commerce.demo.model.Utilisateur;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface UtilisateurMapper {
    UtilisateurDTO toDto(Utilisateur utilisateur);
    Utilisateur toEntity(UtilisateurDTO utilisateurDTO);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "commandes", ignore = true)
    @Mapping(target = "dateCreation", ignore = true)
    void updateUtilisateurFromDto(UtilisateurDTO dto, @MappingTarget Utilisateur entity);
}