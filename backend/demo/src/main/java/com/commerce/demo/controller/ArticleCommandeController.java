package com.commerce.demo.controller;

import com.commerce.demo.DTOs.ArticleCommandeDTO;
import com.commerce.demo.model.ArticleCommande;
import com.commerce.demo.service.ArticleCommandeService;
import com.commerce.demo.controller.base.GenericDtoRestController;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/articles-commande")
public class ArticleCommandeController extends GenericDtoRestController<ArticleCommande, ArticleCommandeDTO, Long> {
    public ArticleCommandeController(ArticleCommandeService service) {
        super(service);
    }
}