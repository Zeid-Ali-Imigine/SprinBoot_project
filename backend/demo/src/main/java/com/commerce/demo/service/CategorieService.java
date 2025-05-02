package com.commerce.demo.service;

import com.commerce.demo.DTOs.CategorieDTO;
import com.commerce.demo.mappers.CategorieMapper;
import com.commerce.demo.model.Categorie;
import com.commerce.demo.repository.CategorieRepository;
import com.commerce.demo.service.base.DtoServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class CategorieService extends DtoServiceImpl<Categorie, CategorieDTO, Long> {

    private final CategorieMapper mapper;

    public CategorieService(CategorieRepository repository, CategorieMapper mapper) {
        super(repository);
        this.mapper = mapper;
    }

    @Override protected CategorieDTO toDto(Categorie entity) { return mapper.toDto(entity); }
    @Override protected Categorie toEntity(CategorieDTO dto) { return mapper.toEntity(dto); }
    @Override protected void updateEntityFromDto(CategorieDTO dto, Categorie entity) { mapper.updateCategorieFromDto(dto, entity); }
}