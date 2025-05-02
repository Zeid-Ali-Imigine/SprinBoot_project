package com.commerce.demo.service;

import com.commerce.demo.DTOs.ProduitDTO;
import com.commerce.demo.mappers.ProduitMapper;
import com.commerce.demo.model.Produit;
import com.commerce.demo.repository.ProduitRepository;
import com.commerce.demo.service.base.DtoServiceImpl;
import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

@Service
public class ProduitService extends DtoServiceImpl<Produit, ProduitDTO, Long> {

    private final ProduitMapper mapper;
    private final CategorieService categorieService;

    public ProduitService(ProduitRepository repository, 
                         ProduitMapper mapper,
                         CategorieService categorieService) {
        super(repository);
        this.mapper = mapper;
        this.categorieService = categorieService;
    }

    @Override
    protected Produit toEntity(ProduitDTO dto) {
        Produit produit = mapper.toEntity(dto);
        produit.setCategorie(categorieService.findById(dto.getCategorieId())
                .orElseThrow(() -> new RuntimeException("Categorie not found")));
        return produit;
    }

    @Override protected ProduitDTO toDto(Produit entity) { return mapper.toDto(entity); }
    @Override protected void updateEntityFromDto(ProduitDTO dto, Produit entity) { mapper.updateProduitFromDto(dto, entity); }
}