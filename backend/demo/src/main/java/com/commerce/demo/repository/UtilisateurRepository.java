package com.commerce.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.commerce.demo.model.Utilisateur;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long>{
    
}
