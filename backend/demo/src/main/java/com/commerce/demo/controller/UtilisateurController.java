package com.commerce.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.commerce.demo.controller.base.GenericRestController;
import com.commerce.demo.model.Utilisateur;
import com.commerce.demo.service.UtilisateurService;

@RestController
@RequestMapping("/api/Utilisateurs")
public class UtilisateurController extends GenericRestController<Utilisateur, Long> {

    public UtilisateurController(UtilisateurService service) {
        super(service);
    }
    
}
