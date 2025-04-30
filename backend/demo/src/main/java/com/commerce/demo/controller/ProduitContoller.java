package com.commerce.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.commerce.demo.controller.base.GenericRestController;
import com.commerce.demo.model.Produit;
import com.commerce.demo.service.ProduitService;



@RestController
@RequestMapping("/api/produits")
public class ProduitContoller extends GenericRestController<Produit, Long> {

    public ProduitContoller(ProduitService service) {
        super(service);
    }
    
}
