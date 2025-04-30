package com.commerce.demo.service;

import org.springframework.stereotype.Service;

import com.commerce.demo.model.ArticleCommande;
import com.commerce.demo.repository.ArticleCommandeRepository;
import com.commerce.demo.service.base.CrudServiceImpl;


@Service
public class ArticleCommandeService extends CrudServiceImpl<ArticleCommande, Long> {
    public ArticleCommandeService(ArticleCommandeRepository repository) {
        super(repository);
    }
    
}
