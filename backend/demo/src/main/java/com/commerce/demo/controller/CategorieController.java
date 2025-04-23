package com.commerce.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.commerce.demo.controller.base.GenericRestController;
import com.commerce.demo.model.Categorie;
import com.commerce.demo.service.CategorieService;

@RestController
@RequestMapping("/api/categories")
public class CategorieController extends GenericRestController<Categorie, Long> {

    public CategorieController(CategorieService service) {
        super(service);
    }
}
