package com.commerce.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.commerce.demo.controller.base.GenericRestController;
import com.commerce.demo.model.Commande;
import com.commerce.demo.service.CommandeService;

@RestController
@RequestMapping("/api/commandes")
public class CommandeController extends GenericRestController<Commande, Long> {

    public CommandeController(CommandeService service) {
        super(service);
    }
    
}
