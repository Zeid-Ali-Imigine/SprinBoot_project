package com.commerce.demo.service;

import org.springframework.stereotype.Service;

import com.commerce.demo.model.Utilisateur;
import com.commerce.demo.repository.UtilisateurRepository;
import com.commerce.demo.service.base.CrudServiceImpl;



@Service
public class UtilisateurService extends CrudServiceImpl<Utilisateur, Long> {
    public UtilisateurService(UtilisateurRepository repository) {
        super(repository);
    }
    
}
