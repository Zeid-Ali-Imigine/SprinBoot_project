package com.commerce.demo.controller;

import com.commerce.demo.DTOs.CategorieDTO;
import com.commerce.demo.model.Categorie;
import com.commerce.demo.service.CategorieService;
import com.commerce.demo.controller.base.GenericDtoRestController;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categories")
public class CategorieController extends GenericDtoRestController<Categorie, CategorieDTO, Long> {
    public CategorieController(CategorieService service) {
        super(service);
    }
}