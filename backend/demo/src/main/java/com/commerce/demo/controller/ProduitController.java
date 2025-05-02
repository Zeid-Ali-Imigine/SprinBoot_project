package com.commerce.demo.controller;

import com.commerce.demo.DTOs.ProduitDTO;
import com.commerce.demo.model.Produit;
import com.commerce.demo.service.ProduitService;
import com.commerce.demo.controller.base.GenericDtoRestController;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/produits")
public class ProduitController extends GenericDtoRestController<Produit, ProduitDTO, Long> {
    public ProduitController(ProduitService service) {
        super(service);
    }
}