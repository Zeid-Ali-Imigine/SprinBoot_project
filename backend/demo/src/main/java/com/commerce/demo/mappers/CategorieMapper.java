package com.commerce.demo.mappers;

import com.commerce.demo.DTOs.CategorieDTO;
import com.commerce.demo.model.Categorie;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface CategorieMapper {
    CategorieDTO toDto(Categorie categorie);
    Categorie toEntity(CategorieDTO categorieDTO);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "produits", ignore = true)
    @Mapping(target = "dateCreation", ignore = true)
    void updateCategorieFromDto(CategorieDTO dto, @MappingTarget Categorie entity);
}