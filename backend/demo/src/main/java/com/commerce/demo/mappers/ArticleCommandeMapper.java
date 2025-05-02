package com.commerce.demo.mappers;

import com.commerce.demo.DTOs.ArticleCommandeDTO;
import com.commerce.demo.model.ArticleCommande;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {ProduitMapper.class, CommandeMapper.class})
public interface ArticleCommandeMapper {
    @Mapping(target = "commandeId", source = "commande.id")
    @Mapping(target = "produitId", source = "produit.id")
    @Mapping(target = "produitNom", source = "produit.nom")
    ArticleCommandeDTO toDto(ArticleCommande articleCommande);
    
    @Mapping(target = "commande", ignore = true)
    @Mapping(target = "produit", ignore = true)
    ArticleCommande toEntity(ArticleCommandeDTO dto);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "commande", ignore = true)
    @Mapping(target = "produit", ignore = true)
    void updateArticleFromDto(ArticleCommandeDTO dto, @MappingTarget ArticleCommande entity);
}