package com.commerce.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.commerce.demo.controller.base.GenericRestController;
import com.commerce.demo.model.ArticleCommande;
import com.commerce.demo.service.ArticleCommandeService;

@RestController
@RequestMapping("/api/article-commandes")
public class ArticleCommandeController extends GenericRestController<ArticleCommande, Long> {

    public ArticleCommandeController(ArticleCommandeService service) {
        super(service);
    }
    
}
