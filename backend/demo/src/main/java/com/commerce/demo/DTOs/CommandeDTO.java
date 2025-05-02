package com.commerce.demo.DTOs;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class CommandeDTO {
    private Long id;
    
    @NotNull
    private Long utilisateurId;
    private String utilisateurNom;
    
    @NotBlank @Size(max = 50)
    private String statut;
    
    @NotNull @Positive
    private Double montantTotal;
    
    @NotBlank @Size(max = 255)
    private String adresseLivraison;
    
    private LocalDateTime dateCommande;
    
    private List<ArticleCommandeDTO> articles;
}