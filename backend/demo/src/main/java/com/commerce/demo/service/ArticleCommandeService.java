package com.commerce.demo.service;

import com.commerce.demo.DTOs.ArticleCommandeDTO;
import com.commerce.demo.mappers.ArticleCommandeMapper;
import com.commerce.demo.model.ArticleCommande;
import com.commerce.demo.repository.ArticleCommandeRepository;
import com.commerce.demo.service.base.DtoServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ArticleCommandeService extends DtoServiceImpl<ArticleCommande, ArticleCommandeDTO, Long> {

    private final ArticleCommandeMapper mapper;
    private final CommandeService commandeService;
    private final ProduitService produitService;

    public ArticleCommandeService(ArticleCommandeRepository repository,
                                ArticleCommandeMapper mapper,
                                CommandeService commandeService,
                                ProduitService produitService) {
        super(repository);
        this.mapper = mapper;
        this.commandeService = commandeService;
        this.produitService = produitService;
    }

    @Override
    protected ArticleCommande toEntity(ArticleCommandeDTO dto) {
        ArticleCommande article = mapper.toEntity(dto);
        article.setCommande(commandeService.findById(dto.getCommandeId())
                .orElseThrow(() -> new RuntimeException("Commande not found")));
        article.setProduit(produitService.findById(dto.getProduitId())
                .orElseThrow(() -> new RuntimeException("Produit not found")));
        return article;
    }

    @Override protected ArticleCommandeDTO toDto(ArticleCommande entity) { return mapper.toDto(entity); }
    @Override protected void updateEntityFromDto(ArticleCommandeDTO dto, ArticleCommande entity) { mapper.updateArticleFromDto(dto, entity); }
}