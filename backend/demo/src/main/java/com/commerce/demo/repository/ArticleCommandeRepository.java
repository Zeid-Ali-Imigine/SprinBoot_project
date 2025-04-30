package com.commerce.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.commerce.demo.model.ArticleCommande;

public interface ArticleCommandeRepository extends JpaRepository<ArticleCommande, Long>{
    
}
