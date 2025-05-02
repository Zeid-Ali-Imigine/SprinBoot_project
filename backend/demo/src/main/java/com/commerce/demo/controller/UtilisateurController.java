package com.commerce.demo.controller;

import com.commerce.demo.DTOs.UtilisateurDTO;
import com.commerce.demo.model.Utilisateur;
import com.commerce.demo.service.UtilisateurService;
import com.commerce.demo.controller.base.GenericDtoRestController;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController extends GenericDtoRestController<Utilisateur, UtilisateurDTO, Long> {
    public UtilisateurController(UtilisateurService service) {
        super(service);
    }
}