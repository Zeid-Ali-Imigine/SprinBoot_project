package com.commerce.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.commerce.demo.model.Commande;

public interface CommandeRepository extends JpaRepository<Commande, Long> {
    
}
