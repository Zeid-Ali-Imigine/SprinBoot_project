package com.commerce.demo.service;

import org.springframework.stereotype.Service;
import com.commerce.demo.model.Categorie;
import com.commerce.demo.repository.CategorieRepository;
import com.commerce.demo.service.base.CrudServiceImpl;

@Service
public class CategorieService extends CrudServiceImpl<Categorie, Long> {
    public CategorieService(CategorieRepository repository) {
        super(repository);
    }
}
