package com.commerce.demo.service;

import com.commerce.demo.DTOs.CommandeDTO;
import com.commerce.demo.mappers.CommandeMapper;
import com.commerce.demo.model.Commande;
import com.commerce.demo.repository.CommandeRepository;
import com.commerce.demo.service.base.DtoServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CommandeService extends DtoServiceImpl<Commande, CommandeDTO, Long> {

    private final CommandeMapper mapper;
    private final UtilisateurService utilisateurService;

    public CommandeService(CommandeRepository repository,
                          CommandeMapper mapper,
                          UtilisateurService utilisateurService) {
        super(repository);
        this.mapper = mapper;
        this.utilisateurService = utilisateurService;
    }

    @Override
    protected Commande toEntity(CommandeDTO dto) {
        Commande commande = mapper.toEntity(dto);
        commande.setUtilisateur(utilisateurService.findById(dto.getUtilisateurId())
                .orElseThrow(() -> new RuntimeException("Utilisateur not found")));
        return commande;
    }

    @Override protected CommandeDTO toDto(Commande entity) { return mapper.toDto(entity); }
    @Override protected void updateEntityFromDto(CommandeDTO dto, Commande entity) { mapper.updateCommandeFromDto(dto, entity); }
}