package com.commerce.demo.mappers;

import com.commerce.demo.DTOs.ProduitDTO;
import com.commerce.demo.model.Produit;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = CategorieMapper.class)
public interface ProduitMapper {
    @Mapping(target = "categorieId", source = "categorie.id")
    @Mapping(target = "categorieNom", source = "categorie.nom")
    ProduitDTO toDto(Produit produit);
    
    @Mapping(target = "categorie", ignore = true)
    Produit toEntity(ProduitDTO produitDTO);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "categorie", ignore = true)
    @Mapping(target = "dateAjout", ignore = true)
    @Mapping(target = "articlesCommande", ignore = true)
    void updateProduitFromDto(ProduitDTO dto, @MappingTarget Produit entity);
}