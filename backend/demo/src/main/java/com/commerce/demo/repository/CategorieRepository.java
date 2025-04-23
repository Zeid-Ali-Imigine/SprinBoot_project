package com.commerce.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.commerce.demo.model.Categorie;

public interface CategorieRepository extends JpaRepository<Categorie, Long> {
    
}
