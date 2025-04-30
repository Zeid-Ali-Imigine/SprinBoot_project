package com.commerce.demo.service;

import org.springframework.stereotype.Service;

import com.commerce.demo.model.Commande;
import com.commerce.demo.repository.CommandeRepository;
import com.commerce.demo.service.base.CrudServiceImpl;


@Service
public class CommandeService extends CrudServiceImpl<Commande, Long> {
    public CommandeService(CommandeRepository repository) {
        super(repository);
    }
    
}
