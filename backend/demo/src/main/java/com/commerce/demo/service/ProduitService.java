package com.commerce.demo.service;

import org.springframework.stereotype.Service;

import com.commerce.demo.model.Produit;
import com.commerce.demo.repository.ProduitRepository;
import com.commerce.demo.service.base.CrudServiceImpl;


@Service
public class ProduitService extends CrudServiceImpl<Produit, Long> {
    public ProduitService(ProduitRepository repository) {
        super(repository);
    }
    
}
