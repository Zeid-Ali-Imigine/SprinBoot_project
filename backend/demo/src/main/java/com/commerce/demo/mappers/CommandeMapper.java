package com.commerce.demo.mappers;

import com.commerce.demo.DTOs.CommandeDTO;
import com.commerce.demo.model.Commande;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {UtilisateurMapper.class, ArticleCommandeMapper.class})
public interface CommandeMapper {
    @Mapping(target = "utilisateurId", source = "utilisateur.id")
    @Mapping(target = "utilisateurNom", source = "utilisateur.nom")
    CommandeDTO toDto(Commande commande);
    
    @Mapping(target = "utilisateur", ignore = true)
    @Mapping(target = "articles", ignore = true)
    Commande toEntity(CommandeDTO commandeDTO);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "utilisateur", ignore = true)
    @Mapping(target = "articles", ignore = true)
    @Mapping(target = "dateCommande", ignore = true)
    void updateCommandeFromDto(CommandeDTO dto, @MappingTarget Commande entity);
}