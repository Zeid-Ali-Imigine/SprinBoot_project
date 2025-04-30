package com.commerce.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.commerce.demo.model.Produit;

public interface ProduitRepository extends JpaRepository<Produit, Long>{
    
}
