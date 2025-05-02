package com.commerce.demo.controller;

import com.commerce.demo.DTOs.CommandeDTO;
import com.commerce.demo.model.Commande;
import com.commerce.demo.service.CommandeService;
import com.commerce.demo.controller.base.GenericDtoRestController;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/commandes")
public class CommandeController extends GenericDtoRestController<Commande, CommandeDTO, Long> {
    public CommandeController(CommandeService service) {
        super(service);
    }
}